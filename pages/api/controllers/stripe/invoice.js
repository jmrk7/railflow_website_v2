import stripe from "stripe";
import pricing from "../../config/pricing.json";

const Stripe = new stripe(process.env.STRIPE_SECRET_KEY);

import { searchCustomer, searchInvoices } from "../../services/stripe/stripe";

async function createInvoice(req, res, next) {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    state,
    country,
    postal_code,
    addressName,
    description,
    num_users,
    license_type,
    license_years,
  } = req.body;

  const stripeAccountData = {
    name: firstName + lastName,
    email,
    phone,
    address: {
      city,
      state,
      country,
      postal_code,
      line1: addressName,
    },
    description,
  };

  var customer = await searchCustomer(email);

  customer.length === 0
    ? (customer = await Stripe.customers.create(stripeAccountData))
    : (customer = customer[0]);

  if (isNaN(req.body.num_users) || num_users < 0 || num_users > 49) {
    return res.status(400).send({
      status: 400,
      data: {
        message: "Invalid num_users: valid value is: 0-49",
      },
    });
  }

  if (typeof req.body.license_years == "undefined") {
    return res.status(400).send({
      status: 400,
      data: {
        message: "Missing required parameter: license_years",
      },
    });
  }

  if (isNaN(req.body.license_years) || license_years < 0 || license_years > 3) {
    return res.status(400).send({
      status: 400,
      data: {
        message: "Invalid License_years: valid values are 0-3",
      },
    });
  }

  if (!license_type === "Enterprise" || !license_type === "Professional") {
    return res.status(400).send({
      status: 400,
      data: {
        message: "Missing required parameter: license_type",
      },
    });
  }

  let InvoiceItems = await searchInvoices(customer.id);

  let remainingValue = 0;

  InvoiceItems.map((item) => (remainingValue += item["amount_remaining"]));

  if (remainingValue > 0) {
    return res
      .status(500)
      .send(
        "You have an outstanding invoice, so you can't create another invoice"
      );
  }

  const pricingType = pricing[req.body.license_type.toLowerCase()];

  let price;
  license_years != 0
    ? (price =
        (pricingType["base"] + pricingType["increment"] * num_users) *
        (1 - pricingType[`discount_${license_years}_year`]) *
        license_years)
    : (price =
        (pricingType["base"] + pricingType["increment"] * num_users) *
        4 *
        (1 - pricingType["discount_perpetual"]));

  const priceObject = await Stripe.prices.create({
    unit_amount: price * 100,
    currency: "usd",
    product: "prod_railflow",
  });

  await Stripe.invoiceItems.create({
    customer: customer.id,
    price: priceObject.id,
    description: `Railflow Enterprise Quote: ${license_years} year License: ${
      num_users * 20
    }-${(num_users + 1) * 20} Users`,
  });

  const invoice = await Stripe.invoices.create({
    customer: customer.id,
    collection_method: "send_invoice",
    days_until_due: 30,
  });

  await Stripe.invoices.finalizeInvoice(invoice.id);

  const send = await Stripe.invoices.sendInvoice(invoice.id);

  res.send(send);
}

module.exports = {
  createInvoice,
};