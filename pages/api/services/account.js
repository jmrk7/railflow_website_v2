/**
 * User controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";

import { getApiClient } from "./request";

import ApiError from "../errors/api";
import BadRequestError from "../errors/badrequest";
import logger from "../config/logger";
/**
 * Service: Update an account
 * @param {*} account_id The account ID
 * @param {*} data The data
 * @returns Promise
 */
async function update(account_id, data) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);

    const response = await apiClient.request({
      method: "PUT",
      url: `/crm/sales/api/sales_accounts/${account_id}`,
      headers: {
        // TODO: use environment variable
        // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
      data: data,
    });
    logger.info(
      `account updated with name: ${response.data.sales_account.name}`
    );
    return response.data.sales_account;
  } catch (error) {
    if (error.response.data.errors.code === 400) {
      throw new BadRequestError(
        `Account with given company name already exists.`
      );
    }
    throw new ApiError(
      `Error while creating the account: ${error.response.data.errors.message[0]}`
    );
  }
}

/**
 * Service: Create an account
 * @param {*} data The data
 * @returns {Promise} Created account
 */
async function create(data) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
    const response = await apiClient.request({
      method: "POST",
      url: "/crm/sales/api/sales_accounts",
      headers: {
        // TODO: use environment variable
        // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
      data: {
        sales_account: { name: data.name },
      },
    });
    logger.info(`Account created with name: ${data.name}`);

    return response.data.sales_account;
  } catch (error) {
    if (error.response.data.errors.code === 400) {
      throw new BadRequestError(
        `Account with given company name ${data.name} already exists.`
      );
    }
    throw new ApiError(
      `Error while creating the account: ${error.response.data.errors.message[0]}`
    );
  }
}

/**
 * Service: update hiveage hash custom field
 * @param {*} account_id The account ID
 * @param {*} hash Hiveage hash
 * @returns Promise
 */
async function updateHiveageHash(account_id, hash) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
    const response = await apiClient.request({
      method: "PUT",
      url: `/crm/sales/api/sales_accounts/${account_id}`,
      headers: {
        // TODO: use environment variable
        // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
      data: {
        sales_account: { custom_field: { cf_hiveage_hash: hash } },
      },
    });

    logger.info(
      `Hiveage hash added to account for this account_id: ${account_id}`
    );
    return response.data.sales_account;
  } catch (error) {
    throw new ApiError(
      `Error while updating hiveage hash: ${error.response.data.errors.message[0]}`
    );
  }
}

/**
 * Service: Get account detail by ID
 * @param {*} account_id Account ID
 * @returns Promise
 */
async function getAccountById(account_id) {
  const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
  try {
    const response = await apiClient.request({
      method: "GET",
      url: `/crm/sales/api/sales_accounts/${account_id}`,
      headers: {
        // TODO: use environment variable
        // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
    });
    if (response && response.status === 200) {
      return response.data.sales_account;
    }
  } catch (error) {
    if (error.response.status == 404) {
      return false;
    }
    logger.error("error when query contact info from freshworks.com");
    return false;
  }
}

/**
 * Service: Get an account by company name
 * @param {*} name The name
 * @returns Promise
 */
async function getAccountIfAlreadyPresent(name) {
  const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
  const response = await apiClient.request({
    method: "GET",
    url: "/crm/sales/api/lookup?q=" + name + "&entities=sales_account&f=name",
    headers: {
      // TODO: use environment variable
      // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
    },
  });
  const sales_accounts = response.data.sales_accounts.sales_accounts;

  if (sales_accounts.length == 0) return null;
  return { id: sales_accounts[0].id };
}

/**
 * Service: Create new Hiveage network
 * @param {*} network The network data
 * @returns Promise
 */
async function createHiveageNetwork(network) {
  try {
    const apiClient = await getApiClient(process.env.HIVEAGE_BASE_URL);
    const response = await apiClient.request({
      method: "POST",
      url: "/api/network",
      headers: {
        // TODO: use environment variable
        "Content-Type": "application/json",
      },
      data: network,
      auth: {
        username: process.env.HIVEAGE_API_KEY,
        password: "",
      },
    });
    logger.info(
      `hiveage network created successfully, with email: ${network.business_email}`
    );
    return response.data.network;
  } catch (error) {
    logger.error(
      `error when create hiveage network with email: ${network.business_email}`
    );
    return false;
  }
}

/**
 * Service: Update new Hiveage network
 * @param {*} network The network data
 * @param {*} hash_key The hash key to be updated
 * @returns Promise
 */
async function updateHiveageNetwork(hash_key, network) {
  try {
    const apiClient = await getApiClient(process.env.HIVEAGE_BASE_URL);
    const response = await apiClient.request({
      method: "PUT",
      url: `/api/network/${hash_key}`,
      headers: {
        // TODO: use environment variable
        "Content-Type": "application/json",
      },
      data: network,
      auth: {
        username: process.env.HIVEAGE_API_KEY,
        password: "",
      },
    });
    logger.info(
      `hiveage network updated successfully with email: ${network.business_email}`
    );
    return response.data.network;
  } catch (error) {
    logger.error("error when update hiveage network");
    return false;
  }
}

/**
 * Service: Get Hiveage network from a hash
 * @param {*} hash Network hash
 * @returns Promise
 */
async function getHiveageNetwork(hash) {
  const apiClient = await getApiClient(process.env.HIVEAGE_BASE_URL);
  try {
    const response = await apiClient.request({
      method: "GET",
      url: `/api/network/${hash}`,
      headers: {
        // TODO: use environment variable
        "Content-Type": "application/json",
      },
      auth: {
        username: process.env.HIVEAGE_API_KEY,
        password: "",
      },
    });
    return response.data.network;
  } catch (error) {
    logger.error(`error when retrive hiveage network, hash: ${hash}`);
    return false;
  }
}

/**
 * Service: Get all account from view - use in filter
 * @param {*} viewId filter view id
 * @returns Promise
 */
async function getAllAccountsFromView(viewId) {
  const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
  const response = await apiClient.request({
    method: "GET",
    url: `/crm/sales/api/sales_accounts/view/${viewId}`,
    headers: {
      // TODO: use environment variable
      // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
    },
  });

  if (response && response.status === 200) {
    return response.data.sales_accounts;
  }

  return null;
}

module.exports = {
  create,
  update,
  getAccountIfAlreadyPresent,
  getAccountById,
  createHiveageNetwork,
  updateHiveageNetwork,
  getHiveageNetwork,
  updateHiveageHash,
};
