/**
 * Beats controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";

import logger from "../config/logger";

import {
  registerBeatsToCryptolens,
  registerBeatsToSalesPanel,
} from "../services/beats";
import { searchByKey } from "../services/contact";

/**
 * Function: Register new Beats
 * @param {*} req Request body
 * @param {*} res Response
 * @param {*} next Next
 * @returns Promise
 */
exports.registerBeats = async (req, res) => {
  try {
    const { metadata, feature, event, key, value } = req.body;

    if (!metadata) {
      throw new Error("Metadata field is required.");
    }

    if (!feature) {
      throw new Error("Feature field is required.");
    }

    if (!event) {
      throw new Error("Event field is required.");
    }

    if (!key) {
      throw new Error("Key field is required.");
    }

    if (!value) {
      throw new Error("Value field is required.");
    }

    registerBeatsToCryptolens({ metadata, feature, event, key, value });

    const contact = await searchByKey(key);
    if (!contact) {
      return res.status(404).send({
        status: 404,
        message: `${key} is not found`,
      });
    }
    registerBeatsToSalesPanel({
      email: contact.email,
      category: feature,
      label: event,
      metadata,
    });
    return res.status(200).send({
      status: 200,
      data: {
        message: "success",
      },
    });
  } catch (error) {
    logger.error(`Error When Register Beat for key ${key}`, error);
    const code = error.code ? error.code : 400;
    const message = error.message
      ? error.message
      : "server either does not recognize the request.";

    return res.status(code).send({
      status: code,
      data: {
        message,
      },
    });
  }
};
