import stripe from "stripe";
import axios from "axios";
import absoluteUrl from "next-absolute-url";

import contactService from "../../services/contact";
import { sendDataToMixpanel } from "../../services/mixpanel";
import slackService from "../../services/slack";

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

    const apiBaseUrl = absoluteUrl(req).origin;
    const priceResult = await axios.get(
      `${apiBaseUrl}/api/routes/pricing?license_years=${req.body.license_years}&license_type=${req.body.license_type}&num_users=${req.body.num_users}`
    );

    const priceValue = req.body.support ? 500 : priceResult.data.pricing.final_price;
    
    const priceObject = await Stripe.prices.create({
      unit_amount: priceValue * 100,
      currency: "usd",
      product: process.env.STRIPE_LIVE_PRODUCT,
    });
    
    const paymentLink = await Stripe.paymentLinks.create({
      line_items: [{ price: priceObject.id, quantity: 1 }],
    });

    const eventData = {
      Name: contact.first_name + " " + contact.last_name,
      Email: contact.email,
      Company: contact.custom_field.cf_company,
      Stripe_Customer_id: contact.id,
      Payment_Link: paymentLink.url,
    }

    await sendDataToMixpanel("Buy Event", eventData);

    const sendData = {
      price: priceResult.data.pricing.final_price,
      payment_link: paymentLink.url,
      payment_id: paymentLink.id,
      company: reqData.contact_cf_company,
      contactId: reqData.contact_id,
      type: "Invoice"
    };
    
    if(process.env.SLACK_MESSAGE_ENABLED) await slackService.sendMessage(sendData);
    
    res.send(sendData);
    
  } catch (err) {
    res.status(500).send(err)
  }
  
}

module.exports = {
  createInvoice,
};
