import stripe from "stripe";
import axios from "axios";
import contactService from "../../services/contact";

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);

async function createInvoice(req, res, next) {
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
    product: "prod_LkYOTh3gWcc2ma",
  });

  await Stripe.invoiceItems.create({
    customer: req.body.stripe_id,
    price: priceObject.id,
    description: `Railflow Enterprise Invoice: ${
      req.body.license_years
    } year License: ${req.body.num_users * 20}-${
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
  reqData.cf_stripe_invoice_link = invoice.invoice_pdf;
  await contactService.updateByStripeInvoice(reqData);

  const sendData = {
    link: invoice.invoice_pdf,
    payment_link: invoice.hosted_invoice_url,
  };

  res.send(sendData);
}

module.exports = {
  createInvoice,
};
