import stripe from "stripe";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

import invoiceService from "../../services/invoice";
import accountService from "../../services/account";
import contactService from "../../services/contact";
import taskService from "../../services/task";
import noteService from "../../services/note";
import { sendDataToMixpanel } from "../../services/mixpanel";
import slackService from "../../services/slack";
const logger = require("../../config/logger");
 
const Stripe = new stripe(process.env.STRIPE_SECRET_LIVE_KEY);

async function createInvoice(req, res, next) {
  try{

    let contact = await contactService.getContactIfAlreadyPresent(req.body.email);

    const reqData = {
      contact_id: contact.id,
      contact_first_name: contact.first_name,
      contact_last_name: contact.last_name,
      contact_cf_company: contact.custom_field.cf_company,
      contact_email: contact.email,
    };
    
    let paymentLink;
    let priceValue;
    if(!req.body.support){

      let apiBaseUrl = absoluteUrl(req).origin;
      let priceResult = await axios.get(
        `${apiBaseUrl}/api/routes/pricing?license_years=${req.body.license_years}&license_type=${req.body.license_type}&num_users=${req.body.num_users}`
      );
  
      priceValue = priceResult.data.pricing.final_price;

      let priceObject = await Stripe.prices.create({
        unit_amount: priceValue * 100,
        currency: "usd",
        product: process.env.STRIPE_LIVE_LICENSE_PRODUCT,
      });

      paymentLink = await Stripe.paymentLinks.create({
        line_items: [{ price: priceObject.id, quantity: 1 }],
      });  
    } 
    else {
      priceValue = 500 * Number(req.body.license_years);
      paymentLink = await Stripe.paymentLinks.create({
        line_items: [{ price: process.env.STRIPE_LIVE_SUPPORT_PRICE, quantity: Number(req.body.license_years) }],
      }); 
    }   

    let account = await accountService.getAccountById(req.body.account_id);

    const data = {
      account_id: req.body.account_id,
      contact_id: req.body.contact_id,
      num_users: req.body.num_users,
      license_type: req.body.license_type,
      license_years: req.body.license_years,
      estimate: {
        billed_total: priceValue
      },
      account: account,
      user: {
        email: req.body.email
      }
    }

    const invoice = await invoiceService.create(data);
    if (invoice.error != null) {
      return res.status(400).send({
        status: 400,
        data: {
          message: invoice.error.message,
          account_id: req.body.account_id,
          contact_id: req.body.contact_id,
        },
      });
    }

    await noteService.create(
      contact.id,
      `Invoice: ${paymentLink.url}`
    );
    await noteService.accountNote(
      account.id,
      `Invoice: ${paymentLink.url}`
    );

    await slackService.sendSlackMessage(
      `Railflow Invoice: $${priceValue} <https://railflow.myfreshworks.com/crm/sales/accounts/${account.id}|${account.name}>, <https://railflow.myfreshworks.com/crm/sales/deals/${invoice.fsOpportunity.id}|Freshsales Deal>, <${paymentLink.url}|Stripe Invoice> :slightly_smiling_face:`
    );

    const taskData1 = {
      owner_id: 16000006416,
      title: "Update opportunity contacts",
      description: `Update opportunity account id: ${account.id}`,
      due_date: 24,
      targetable_id: account.id,
      targetable_type: "SalesAccount",
    };
    const taskData2 = {
      owner_id: 16000006416,
      title: `${account.name}: Invoice follow up`,
      description: `Invoice follow up account id: ${account.id}\nOpportunity Link: https://railflow.myfreshworks.com/crm/sales/deals/${invoice.fsOpportunity.id}`,
      due_date: 7,
      targetable_id: invoice.fsOpportunity.id,
      targetable_type: "Deal",
    };
    const task1 = await taskService.createTask(taskData1);
    const task2 = await taskService.createTask(taskData2);
    const eventData = {
      Name: contact.first_name + " " + contact.last_name,
      Email: contact.email,
      Company: contact.custom_field.cf_company,
      Stripe_Customer_id: contact.id,
      Payment_Link: paymentLink.url,
    }

    await sendDataToMixpanel("Buy Event", eventData);

    const sendData = {
      price: priceValue,
      payment_link: paymentLink.url,
      payment_id: paymentLink.id,
      company: reqData.contact_cf_company,
      contactId: reqData.contact_id,
      type: "Invoice"
    };
    
    res.send(sendData);    
  } catch (err) {
    logger.error(`error:Invoice,`, err);
    res.status(500).send(err)
  }
  
}

module.exports = {
  createInvoice,
};
