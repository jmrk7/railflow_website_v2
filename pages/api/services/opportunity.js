"use strict";

import { getApiClient } from "./request";

import ApiError from "../errors/api";
import logger from "../config/logger";

/**
 * Service: Update an opportunity follow the request id
 * @param {*} id Opportunity ID to be updated
 * @param {*} data Opportunity Data
 * @returns Promise
 */
async function updateFsOpportunity(id, data) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
    const response = await apiClient.request({
      method: "PUT",
      url: `/crm/sales/api/deals/${id}`,
      headers: {
        // TODO: use environment variable
        // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
      data: data,
    });

    logger.info(`Opportunity updated with name: ${response.data.deal.name}`);
    return response.data.deal;
  } catch (error) {
    throw new ApiError(
      `Error while updating the opportunity: ${error.response.data.errors.message[0]}`
    );
  }
}

/**
 * Service: Create a new Opportunity and assign to correct column
 * @param {*} data Opportunity Data
 * @returns Promise
 */
async function createFsOpportunity(data) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
    const response = await apiClient.request({
      method: "POST",
      url: "/crm/sales/api/deals",
      headers: {
        // TODO: use environment variable
        // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
      data: data,
    });

    logger.info(`Opportunity created with name: ${data.deal.name}`);
    return response.data.deal;
  } catch (error) {
    if (error.response.data.errors.code === 400) {
      throw new BadRequestError(`Opportunity with given info already exists.`);
    }
    throw new ApiError(
      `Error while creating the opportunity: ${error.response.data.errors.message[0]}`
    );
  }
}

/**
 * Service: Get an opportunity by input ID
 * @param {*} id Opportunity ID
 * @returns Promise
 */
async function getFsOpportunity(id) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL);
    const response = await apiClient.request({
      method: "GET",
      url: `/crm/sales/api/deals/${id}`,
      headers: {
        // TODO: use environment variable
        // Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
      },
    });

    logger.info(`Opportunity retrived with ID ${id}`);
    return response.data.deal;
  } catch (error) {
    return false;
  }
}
module.exports = {
  createFsOpportunity,
  getFsOpportunity,
  updateFsOpportunity,
};
