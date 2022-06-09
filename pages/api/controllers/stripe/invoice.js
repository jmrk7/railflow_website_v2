import stripe from "stripe";
import axios from "axios";
import contactService from "../../services/contact";
import { sendDataToMixpanel } from "../../services/mixpanel";

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);

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

    const priceResult = await axios.get(
      `${process.env.PRICING_URL}pricing?license_years=${req.body.license_years}&license_type=${req.body.license_type}&num_users=${req.body.num_users}`
    );

    const priceObject = await Stripe.prices.create({
      unit_amount: priceResult.data.pricing.final_price * 100,
      currency: "usd",
      product: process.env.STRIPE_TEST_PRODUCT,
    });

    await Stripe.invoiceItems.create({
      customer: req.body.stripe_id,
      price: priceObject.id,
      description: `Railflow ${req.body.license_type} invoice for TestRail: ${
        req.body.license_years
      } year License for ${req.body.num_users * 20}-${
        (req.body.num_users + 1) * 20
      } Users`,
    });

    const invoice = await Stripe.invoices.create({
      customer: req.body.stripe_id,
      collection_method: "send_invoice",
      days_until_due: 30,    
    });

    await Stripe.invoices.finalizeInvoice(invoice.id);

    const send = await Stripe.invoices.sendInvoice(invoice.id);

    reqData.cf_stripe_customer_id = req.body.stripe_id;
    reqData.cf_stripe_invoice_link = send.invoice_pdf;
    await contactService.updateByStripeInvoice(reqData);

    const eventData = {
      Name: contact.first_name + " " + contact.last_name,
      Email: contact.email,
      Company: contact.custom_field.cf_company,
      Stripe_Customer_id: contact.id,
      Invoice_Pdf_link: send.invoice_pdf,
      Invoice_payment_link: send.hosted_invoice_url,
    }

    await sendDataToMixpanel("Invoice Event", eventData);

    const sendData = {
      link: send.invoice_pdf,
      payment_link: send.hosted_invoice_url,
    };

    res.send(sendData);
    
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
  
}

module.exports = {
  createInvoice,
};
