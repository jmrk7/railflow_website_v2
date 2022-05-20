/**
 * Account controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";

import logger from "../config/logger";
import ApiError from "../errors/badrequest";
import accountService from "../services/account";
import { checkToken } from "../services/token";

import { updateCustomer } from "../services/stripe/stripe";

/**
 * update an account based on the account_id in the request body
 * @param {*} req Request body
 * @param {*} res Response
 * @param {*} next Next
 * @returns promise
 */
async function updateAccount(req, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(req.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }
  const account = await accountService.getAccountById(req.body.account_id);
  if (!account) {
    return res.status(200).send({
      status: 200,
      data: {
        message: `account not found`,
        account_id: req.body.account_id,
      },
    });
  }

  const updateData = {
    address: {
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      postal_code: req.body.zip_code,
      line1: req.body.address,
    },
    metadata: {
      "Company Name": req.body.company_name,
    },
  };

  const result = await updateCustomer(req.body.stripe_id, updateData);

  res.send(result);
}

module.exports = {
  updateAccount,
};
