"use strict";

import { getApiClient } from "./request";

import ApiError from "../errors/api";
import dayjs from "dayjs";
import logger from "../config/logger";

/**
 * Service: Create new Task
 * @param {*} data Task data
 * @returns Promise
 */
async function create(data) {
  try {
    const afterDays = [5, 10];
    for (let d of afterDays) {
      const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL); // put railflow host
      const response = await apiClient.request({
        method: "POST",
        url: "/crm/sales/api/tasks",
        headers: {
          // TODO: use environment variable
          Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
          "Content-Type": "application/json",
        },
        data: {
          task: {
            // title: `follow-up-${d}-days: ${data.contact_id}`,
            title: `follow-up-${d}-days`,
            description: `${d}-day-follow-up`,
            due_date: dayjs()
              .add(d, "days")
              .format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]"),
            owner_id: 16000006416,
            targetable_id: data.contact_id,
            targetable_type: "Contact",
          },
        },
      });
    }

    logger.info(
      `Tasks created successfully for contact id: ${data.contact_id}`
    );
    return {
      success: true,
      message: `${afterDays.length} Tasks created successfully`,
    };
  } catch (error) {
    throw new ApiError(
      `Error while creating tasks for contact: ${data.contact_id}`
    );
  }
}

/**
 * Service: Create new Task new
 * @param {*} data Task data
 * @returns Promise
 */
async function createTask(data) {
  try {
    const apiClient = await getApiClient(process.env.FRESHSALES_BASE_URL); // put railflow host
    const response = await apiClient.request({
      method: "POST",
      url: "/crm/sales/api/tasks",
      headers: {
        // TODO: use environment variable
        Authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        task: {
          title: data.title,
          description: data.description,
          due_date: dayjs()
            .add(data.due_date, "days")
            .format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]"),
          owner_id: data.owner_id,
          targetable_id: data.targetable_id,
          targetable_type: data.targetable_type,
        },
      },
    });

    logger.info(
      `Tasks created successfully for ${data.targetable_type} id: ${data.targetable_id}`
    );
    return {
      success: true,
      message: `Task: ${data.title} created successfully`,
    };
  } catch (error) {
    throw new ApiError(
      `Error while creating tasks for ${data.targetable_type} id: ${data.targetable_id}`
    );
  }
}

module.exports = {
  create,
  createTask,
};
