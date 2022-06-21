"use strict";

import stripe from "stripe";

import ApiError from "../../errors/api";
import logger from "../../config/logger";
/**
 * Service: Update an account
 * @param {*} email The customer eamil
 * @returns Promise
 */
const Stripe = new stripe(process.env.STRIPE_SECRET_LIVE_KEY);

async function searchCustomer(email) {
  const customer = await Stripe.customers.search({
    query: `email:"${email}"`,
  });

  return customer.data;
}

async function searchInvoices(customerId) {
  const invoice = await Stripe.invoices.search({
    query: `customer:"${customerId}"`,
  }, { maxNetworkRetries: 2 });

  return invoice.data;
}

async function searchQuotes(customerId) {
  const quotesList = await Stripe.quotes.list({
    customer: customerId,
    status: "open",
  });

  return quotesList.data;
}

async function createUser(stripeAccountData) {
  const result = await Stripe.customers.create(stripeAccountData, { maxNetworkRetries: 2 });
  return result;
}

async function updateCustomer(id, Data) {
  const result = await Stripe.customers.update(id, Data);
  return result;
}

module.exports = {
  searchCustomer,
  searchInvoices,
  searchQuotes,
  updateCustomer,
  createUser,
};
