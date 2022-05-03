/**
 * User controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import Handlebars from "handlebars";

import ApiError from "../errors/api";

const contactService = require("../services/contact");
const accountService = require("../services/account");
const emailService = require("../services/email");
const noteService = require("../services/note");
const taskService = require("../services/task");
const licenseService = require("../services/license");
const uploadService = require("../services/uploadLicence");
const { checkToken } = require("../services/token");
const logger = require("../config/logger");

async function createLead(req, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(req.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }

  try {
    // 1. get token
    // 2. send email
    // 3. update contact status
    // 4. create two follow up tasks with reminder 5 and 10 days.
    // add a note to the contact mentionining the details of token, email etc

    const contactExists = await contactService.getContactIfAlreadyPresent(
      req.body.contact_email
    );

    if (contactExists === null) {
      return res.status(200).send({
        status: 200,
        data: {
          message: `contact not found`,
        },
      });
    }

    const cryptolensTokenObject = await licenseService.getCryptolensToken(
      req.body
    );
    const mailgunResponse = await sendOnboardingEmail(
      req.body,
      cryptolensTokenObject
    );
    const mailgunEmailUrl =
      "https://app.mailgun.com/app/sending/domains/mail.railflow.io/logs/";
    const description = `License key: ${
      cryptolensTokenObject.key
    } \n\n Email sent at: ${dayjs()} \n\n Mailgun Id: ${mailgunEmailUrl}${
      mailgunResponse.emailData.id
    }/history`;
    const createNotesResponse = await noteService.create(
      req.body.contact_id,
      description
    );
    const createTaskResponse = await taskService.create({
      contact_id: req.body.contact_id,
    });
    req.body.cf_license_key = cryptolensTokenObject.key;
    const contact = await contactService.update(req.body);

    return res.status(201).send({
      status: 201,
      data: {
        // message: `> lead created successfully: ${contact.id}`,
        message: `contact verified`,
        contact_id: contact.id,
        license_key: cryptolensTokenObject.key,
        license_url: mailgunResponse.licenseUrl,
        mailgun: `${mailgunEmailUrl}${mailgunResponse.emailData.id}/history`,
      },
    });
  } catch (error) {
    return res.status(error.status).send(error);
  }
}

function getCryptolensTokenEmailContent(cryptolensTokenObject) {
  return `Customer Id: ${cryptolensTokenObject.customerId} | Token: ${cryptolensTokenObject.key}`;
}

async function getCryptolensFileUrl(cryptolensTokenObject) {
  try {
    const uploadRes = await uploadService.uploadLicence(cryptolensTokenObject);
    let text = ` You can also check out your license here: ${uploadRes.url}`;
    // text = uploadRes.Location;
    return {
      url: uploadRes.url,
      text,
    };
  } catch (error) {
    throw new ApiError(`Error while uploading the file; ${error}`);
  }
}

async function sendOnboardingEmail(body, cryptolensTokenObject) {
  try {
    // collate all the data. pass it to general email service send.
    let text = getCryptolensTokenEmailContent(cryptolensTokenObject);
    const contactId = body.contact_id;

    cryptolensTokenObject.customerName = `${body.contact_first_name}_${body.contact_last_name}`;
    const { url: licenseUrl, text: cryptolensLicenseFileTextContent } =
      await getCryptolensFileUrl(cryptolensTokenObject);
    cryptolensTokenObject.url = licenseUrl;
    text += cryptolensLicenseFileTextContent;

    logger.info(`Onboarding email text: ${text}`);

    const template = fs.readFileSync(
      path.join(__dirname, "../../email-templates/signup.hbs"),
      "utf8"
    );
    const compiled = Handlebars.compile(template);
    const templateData = {
      licenseKey: cryptolensTokenObject.key,
      licenseUrl: cryptolensTokenObject.url,
    };
    const html = compiled(templateData);
    const extraInfo = {
      "v:contactId": contactId,
      "o:tracking": "yes",
      "o:tracking-clicks": "yes",
      html,
    };

    const to = body.contact_email || "ali.raza@agiletestware.com";

    const emailData = await emailService.sendEmail(to, text, extraInfo);
    return {
      emailData: emailData,
      licenseUrl: licenseUrl,
    };
  } catch (error) {
    throw new ApiError(
      `There was some issue sending email to: ${body.contact_id} ${error}`
    );
    return;
  }
}

module.exports = {
  createLead,
};
