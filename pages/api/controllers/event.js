/**
 * User controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";

import dayjs from "dayjs";
import logger from "../config/logger";

import BadRequestError from "../errors/badrequest";
import noteService from "../services/note";
import { checkToken } from "../services/token";

/**
 * Function: Create new Event
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Promise
 */
async function createEvent(req, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(req.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }

  try {
    if (
      !req.body["event-data"] ||
      !req.body["event-data"]["user-variables"] ||
      !req.body["event-data"]["user-variables"].contactId
    ) {
      throw new BadRequestError(`Contact id is required to register event`);
    }

    if (!req.body.signature || !req.body.signature.timestamp) {
      throw new BadRequestError(
        `signature.timestamp required to register event`
      );
    }
    if (!req.body["event-data"] || !req.body["event-data"].event) {
      throw new BadRequestError(`event required to register event`);
    }

    const eventData = req.body["event-data"];
    const event = eventData.event;
    const contactId = eventData["user-variables"].contactId;
    const timestamp = req.body.signature.timestamp * 1000; // converting to mili seconds
    let noteDescription = `Email was: ${event} at ${dayjs(timestamp).format(
      "YYYY-MM-DD HH:mm:ss"
    )}`;
    await noteService.create(contactId, noteDescription);
    return res.status(200).send({
      status: 200,
      data: {
        message: `Event created for contact id: ${contactId}`,
      },
    });
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send({
        status: error.status,
        message: error.message,
      });
    }
    return res.status(500).send({
      status: 500,
      data: {
        message: "something went wrong",
      },
    });
  }
}

module.exports = {
  createEvent,
};
