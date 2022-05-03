"use strict";

import { getApiClient } from "../services/request";

import ApiError from "../errors/api";
import logger from "../config/logger";
/**
 * Service: Add a note into tagetable ID
 * @param {*} targetableId Tagetable ID, should be a contact ID
 * @param {*} description Note content
 * @returns Promise
 */
async function create(targetableId, description) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL); // put railflow host
    const response = await apiClient.request({
      method: "POST",
      url: "/crm/sales/api/notes",
      headers: {
        // TODO: use environment variable
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`, // fPjGQStTY1ffGqtyAj9RVw
        // 'Content-Type': 'application/json',
      },
      data: {
        note: {
          description,
          targetable_type: "Contact",
          targetable_id: targetableId,
        },
      },
    });

    logger.info(`Note created successfully for contact id: ${targetableId}`);
    return response.data;
  } catch (error) {
    logger.error("Note Create Error", error);
    throw new ApiError(
      `Error while creating note for contact id: ${targetableId}`
    );
  }
}

/**
 * Service: Crate new note for account
 * @param {*} targetableId Targetable ID should be account_id
 * @param {*} description Note content
 * @returns Promise
 */
async function accountNote(targetableId, description) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL); // put railflow host
    const response = await apiClient.request({
      method: "POST",
      url: "/crm/sales/api/notes",
      headers: {
        // TODO: use environment variable
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`, // fPjGQStTY1ffGqtyAj9RVw
        "Content-Type": "application/json",
      },
      data: {
        note: {
          description,
          targetable_type: "SalesAccount",
          targetable_id: targetableId,
        },
      },
    });

    logger.info(`Note created successfully for account id: ${targetableId}`);
    return response.data;
  } catch (error) {
    throw new ApiError(
      `Error while creating node for account id: ${targetableId}`
    );
  }
}

module.exports = {
  create,
  accountNote,
};
