/**
 * User controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";

import logger from "../config/logger";
import invoiceService from "../services/invoice";
import { checkToken } from "../services/token";

/**
 * Function: Create new Opportunity
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Promise
 */
async function createOpportunity(req, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(req.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }

  try {
    const data = {
      name: req.body.deal_sales_account_name,
      business_email: req.body.deal_cf_contact_email,
      category: "organization",
      currency: "USD",
      address: req.body.deal_sales_account_address,
      city: req.body.deal_sales_account_city,
      state_name: req.body.deal_sales_account_state,
      zip_code: req.body.deal_sales_account_zipcode,
      country: req.body.deal_sales_account_country,
      phone: req.body.deal_sales_account_phone,
    };

    const resp = await invoiceService.createInvoiceClient(data);
    return res.status(resp.status).send({
      status: resp.status,
      data: resp.data,
    });
  } catch (error) {
    logger.error("Error in creating opportunity", error);
    return res.status(500).send({
      status: 500,
      data: {
        message: `Error while creating an opportunity`,
      },
    });
  }
}

module.exports = {
  createOpportunity,
};
