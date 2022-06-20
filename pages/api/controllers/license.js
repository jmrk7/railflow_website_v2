/**
 * User controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";

import ApiError from "../errors/api";
import { getApiClient } from "../services/request";

import emailService from "../services/email";
import noteService from "../services/note";
import licenseService from "../services/license";
import contactService from "../services/contact";
import uploadService from "../services/uploadLicence";
import { checkToken, checkTokenSlash } from "../services/token";
import logger from "../config/logger";

/**
 * Function: Extend License base on contact_cf_extension_period in the body
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Promise
 */
async function extendLicense(req, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(req.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }

  try {
    const license = await licenseService.extend(req.body);
    const description = `License has been extended by ${req.body.contact_cf_extension_period} days`;
    const createNotesResponse = await noteService.create(
      req.body.contact_id,
      description
    );
    await sendLicenseExtensionEmail(
      req.body,
      `Your license has been extended by ${req.body.contact_cf_extension_period} days.`
    );

    return res.status(200).send({
      status: 200,
      data: {
        message: `license extended successfully for the contact: ${req.body.contact_id}`,
      },
    });
  } catch (error) {
    logger.error(
      `Error while extending license for: ${req.body.contact_id}`,
      error
    );
    return res.status(500).send({
      status: 500,
      data: {
        message: "something went wrong",
      },
    });
  }
}

/**
 * Function: Extend License base on duration in the payload body
 * @param {*} req Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Promise
 */
async function extendLicenseSlack(req, res, next) {
  const isAuthenticated = await checkTokenSlash(req.body.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }
  const payloadParams = req.body.text.split(":");

  if (typeof payloadParams[2] === "undefined" || payloadParams[2] === "") {
    return res.json({
      response_type: "in_channel", // public to the channel
      text: "Email is invalid, please follow this example (periods 0-36 months, Zero is default to 14 days):\n`/license Customer Name:Company:Email:Duration`",
    });
  } else {
    const apiClient = await getApiClient(req.body.response_url);
    req.body.contact_email = payloadParams[2];
    req.body.contact_cf_extension_period = parseInt(payloadParams[3]);
    let licensePeriods = 14;
    if (req.body.contact_cf_extension_period > 0) {
      var today = new Date();
      var newDate = new Date();
      newDate.setMonth(today.getMonth() + req.body.contact_cf_extension_period);
      licensePeriods = (newDate - today) / (1000 * 60 * 60 * 24);
    }
    res.json({
      response_type: "in_channel", // public to the channel
      text: `Extending license for ${payloadParams[2]} duration: ${licensePeriods} days`,
    });
    const contact = await contactService.getContactIfAlreadyPresent(
      req.body.contact_email
    );
    if (contact != null) {
      req.body.contact_cf_license_key = contact.custom_field.cf_license_key;
      req.body.contact_cf_extension_period = licensePeriods;
      req.body.contact_id = contact.id;
      req.body.contact_email = contact.email;
      req.body.contact_first_name = contact.first_name;
      req.body.contact_last_name = contact.last_name;
      req.body.contact_cf_company = payloadParams[1];

      const cryptolensTokenObject = await licenseService.getCryptolensToken(
        req.body,
        licensePeriods
      );
      const uploadRes = await uploadService.uploadLicence(
        cryptolensTokenObject
      );
      const extendedLicense = await licenseService.extend(req.body);
      if (extendedLicense.result == 0) {
        const description = `License has been extended by ${req.body.contact_cf_extension_period} days`;
        const createNotesResponse = await noteService.create(
          req.body.contact_id,
          description
        );
        // await sendLicenseExtensionEmail(req.body, `Your license has been extended by ${req.body.contact_cf_extension_period} days.`);
        await contactService.update({
          contact_id: contact.id,
          cf_license_key: cryptolensTokenObject.key,
          cf_license_key_url: uploadRes.url,
        });
        return await apiClient.request({
          method: "POST",
          data: {
            response_type: "in_channel", // public to the channel
            text: `License extended.\nLicense Key: ${cryptolensTokenObject.key}\nLicense Url: ${uploadRes.url}`,
          },
        });
      } else {
        return await apiClient.request({
          method: "POST",
          data: {
            response_type: "in_channel", // public to the channel
            text: `Error while extending the license.`,
          },
        });
      }
    } else {
      return await apiClient.request({
        method: "POST",
        data: {
          response_type: "in_channel", // public to the channel
          text: `Error: Cannot find customer related to email ${req.body.contact_email}.`,
        },
      });
    }
  }
}
/**
 * Protected Function: Send the license email after extended
 * @param {*} body Body
 * @param {*} text Text
 * @returns Promise
 */
async function sendLicenseExtensionEmail(body, text) {
  try {
    // collate all the data. pass it to general email service send.

    const contactId = body.contact_id;
    const html = `<p>${text}</p>`;
    const extraInfo = {
      "v:contactId": contactId,
      html,
    };

    const to = body.contact_email || "railflowio@yopmail.com";
    const emailData = await emailService.sendEmail(to, text, "Railflow: Your license key is here.", extraInfo);
    return emailData;
  } catch (error) {
    logger.error(`> error when sendLicenseExtensionEmail`, error);
    throw new ApiError(
      `There was some issue sending email to: ${body.contact_id}`
    );
  }
}

module.exports = {
  extendLicense,
  extendLicenseSlack,
};
