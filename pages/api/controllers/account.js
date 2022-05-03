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
  let oldNetwork,
    newNetwork = null;
  const networkData = {
    name: req.body.company_name,
    first_name: req.body.hiveage_fname,
    last_name: req.body.hivage_lname,
    address: req.body.address,
    city: req.body.city,
    state_name: req.body.state,
    zip_code: req.body.zipcode,
    country: req.body.country,
    business_email: req.body.hiveage_contact_email,
    primary_contact_first_name: req.body.hiveage_fname,
    primary_contact_last_name: req.body.hivage_lname,
    category: "organization",
    currency: "USD",
    language: "en-us",
  };
  // check and create new network
  if (account.custom_field.cf_hiveage_hash != null) {
    oldNetwork = await accountService.getHiveageNetwork(
      account.custom_field.cf_hiveage_hash
    );
  }
  if (account.custom_field.cf_hiveage_hash == null || !oldNetwork) {
    try {
      newNetwork = await accountService.createHiveageNetwork(networkData);
    } catch (error) {
      logger.error("error when create hiveage network", error);
      return res.status(500).send({
        status: 500,
        data: {
          message: `error when create hiveage network`,
          account_id: req.body.account_id,
        },
      });
    }
  }
  if (oldNetwork) {
    try {
      const updatedNetwork = await accountService.updateHiveageNetwork(
        oldNetwork.hash_key,
        networkData
      );
      return res.status(200).send({
        status: 200,
        data: {
          message: "updated account",
          account_id: req.body.account_id,
          hiveage: {
            id: oldNetwork.id,
            hash_key: oldNetwork.hash_key,
          },
        },
      });
    } catch (error) {
      logger.error("error when update hiveage network", error);
      return res.status(500).send({
        status: 500,
        data: {
          message: `error when update hiveage network`,
          account_id: req.body.account_id,
          hiveage: {
            id: oldNetwork.id,
            hash_key: oldNetwork.hash_key,
          },
        },
      });
    }
  } else {
    const updatedAccount = await accountService.updateHiveageHash(
      account.id,
      newNetwork.hash_key
    );
    return res.status(201).send({
      status: 201,
      data: {
        message: "updated account",
        account_id: req.body.account_id,
        hiveage: {
          id: newNetwork.id,
          hash_key: newNetwork.hash_key,
        },
      },
    });
  }
}
module.exports = {
  updateAccount,
};
