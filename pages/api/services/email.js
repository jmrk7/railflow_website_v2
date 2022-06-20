"use strict";

import mailgun from "mailgun-js";

import ApiError from "../errors/api";
import logger from "../config/logger";

/**
 * Service: Send email
 * @param {*} to Email to
 * @param {*} text Email content
 * @param {*} extraInfo Email extra info
 * @returns Promise
 */
async function sendEmail(to, text, subjectText, extraInfo = {}) {
  const DOMAIN = process.env.DOMAIN;
  const mg = mailgun({ apiKey: process.env.MAILGUN_KEY, domain: DOMAIN });
  const data = {
    from: "Railflow Support <contact@railflow.io>",
    to,
    bcc: "jessicalee+7clznyo@railflow.myfreshworks.com",
    subject: subjectText,
    ...extraInfo,
  };

  try {
    const body = await mg.messages().send(data);
    logger.info(`Email queued successfully to: ${to} | email_id: ${body.id}`);
    return {
      id: body.id,
    };
  } catch (error) {
    logger.error(`> error while sending email: ${error}`);
    throw new ApiError(`Error while sending onboarding email.`);
  }
}

module.exports = {
  sendEmail,
};
