/**
 * User controller.
 * Contains all the business logic executed after
 * hitting any user endpoint in routes.
 */

"use strict";

import fs from "fs";
import Handlebars from "handlebars";
import dayjs from "dayjs";
import path from "path";
import ApiError from "../errors/api";
import UnprocessableRequestError from "../errors/unprocessablerequest";
import contactService from "../services/contact";
import accountService from "../services/account";
import slackService from "../services/slack";
import licenseService from "../services/license";
import emailService from "../services/email";
import uploadService from "../services/uploadLicence";
import noteService from "../services/note";
import taskService from "../services/task";

import { checkToken } from "../services/token";
import logger from "../config/logger";

/**
 * Function: Create new Contact
 * @param {*} request Request body
 * @param {*} res Response
 * @param {*} next Next
 * @returns Promise
 */
async function createContact(request, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(request.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }

  try {
    const data = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      phone: request.body.phone,
      jobTitle: request.body.jobTitle,
      company: request.body.company,
      cf_test_data: request.body.cf_test_data,
    };

    // check if the contact is already there.
    const alreadyPresent = await contactService.getContactIfAlreadyPresent(
      request.body.email
    );
    if (alreadyPresent !== null) {
      logger.info(`contact with ${data.email} email already present`);
      console.log(alreadyPresent);
      return res.status(200).send({
        status: 200,
        data: {
          message: `Found a contact created with email: ${request.body.email}`,
          contact_id: alreadyPresent.id,
          account_id: alreadyPresent.custom_field.cf_account_id,
          company_name: alreadyPresent.custom_field.cf_company,
        },
      });
    }
    // Retrieve account/company
    let account = await accountService.getAccountIfAlreadyPresent(
      request.body.company
    );

    if (!account) {
      account = await accountService.create({ name: request.body.company });
    }

    if (!!account) {
      data.sales_accounts = [
        {
          id: account.id,
          is_primary: true,
        },
      ];
      data.account_id = account.id;
      const response = await contactService.create(data);
      if (response && response.data && response.data.contact) {
        if (typeof request.body.notify == "undefined" || request.body.notify) {
          const notificationData = {
            contactId: response.data.contact.id,
            company: request.body.company,
          };
          logger.info(
            `contact created. sending slack notification: ${response.data.contact.id}`
          );
          await slackService.sendMessage(notificationData);
        }
        return res.status(201).send({
          status: 201,
          data: {
            message: "contact created",
            contact_id: response.data.contact.id,
            account_id: account.id,
            company_name: response.data.contact.custom_field.cf_company,
          },
        });
      }
    }

    return res.status(500).send({
      status: 500,
      data: {
        message: `Account creation failed for email: ${request.body.email}`,
      },
    });
  } catch (error) {
    logger.error("Error when creating contact", error);
    if (error.message == "BAD_REQUEST_MOBILE_NUMBER_EXISTS") {
      return res.status(400).send({
        status: 400,
        data: {
          message: "Duplicate Phone Number",
          phone: request.body.phone,
        },
      });
    }

    if (error.message == "Invalid value for mobile_number.") {
      return res.status(400).send({
        status: 403,
        data: {
          message: "Invalid value for mobile_number.",
          phone: request.body.phone,
        },
      });
    }
    return res.status(500).send({
      status: 500,
      data: {
        message: "something went wrong"
      }
    });
  }
}

/**
 * Function: update a Contact
 * @param {*} request Request
 * @param {*} res Response
 * @param {*} next Next
 * @returns Promise
 */
async function updateContact(request, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(request.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }

  try {
    const contact_id = request.body.contact_id;
    let contact = false;
    try {
      contact = await contactService.getContactById(contact_id);
    } catch (error) {
      logger.error("Error when updating Contact", error);
      return res.status(400).send({
        status: 400,
        data: {
          message: `Cannot get contact`,
          contact_id: request.body.contact_id,
        },
      });
    }
    if (!contact) {
      return res.status(400).send({
        status: 400,
        data: {
          message: `contact not found`,
        },
      });
    }
    const reqData = {
      contact_id: contact.id,
      contact_first_name: contact.first_name,
      contact_last_name: contact.last_name,
      contact_cf_company: contact.custom_field.cf_company,
      contact_email: contact.email,
    };

    // get or create sales account
    let account = false;
    try {
      account = await accountService.getAccountIfAlreadyPresent(
        reqData.contact_cf_company
      );
    } catch (error) {
      return res.status(400).send({
        status: 400,
        data: {
          message: `Cannot get account`,
          company: reqData.contact_cf_company,
        },
      });
    }

    if (!account || account === null) {
      try {
        account = await accountService.create({
          name: reqData.contact_cf_company,
        });
      } catch (error) {
        return res.status(400).send({
          status: 400,
          data: {
            message: `Error during creating new account`,
            company: reqData.contact_cf_company,
            error: error,
          },
        });
      }
    }

    // contact already has the cf_license_key exists
    if (
      contact &&
      contact.custom_field &&
      contact.custom_field.cf_license_key &&
      contact.recent_note
    ) {
      return res.status(200).send({
        status: 200,
        data: {
          message: `contact verified`,
          contact_id: contact.id,
          account_id: contact.custom_field.cf_account_id,
          first_name: contact.first_name,
          last_name: contact.last_name,
          address: contact.address,
          city: contact.city,
          state: contact.state,
          zipcode: contact.zipcode,
          country: contact.country,
          license_key: contact.custom_field.cf_license_key,
          company_name: contact.custom_field.cf_company,
        },
      });
    }

    if (!!account) {
      const cryptolensTokenObject = await licenseService.getCryptolensToken(
        reqData
      );
      const mailgunResponse = await sendOnboardingEmail(
        reqData,
        cryptolensTokenObject
      );
      const mailgunEmailUrl =
        "https://app.mailgun.com/app/sending/domains/mail.railflow.io/logs/";
      const description = `License key: ${
        cryptolensTokenObject.key
      } \n\n Email sent at: ${dayjs()} \n\n Mailgun Id: ${mailgunEmailUrl}${
        mailgunResponse.emailData.id
      }/history \n\n License URL: ${mailgunResponse.licenseUrl}`;
      const createNotesResponse = await noteService.create(
        reqData.contact_id,
        description
      );
      const createTaskResponse = await taskService.create({
        contact_id: reqData.contact_id,
      });
      reqData.cf_license_key = cryptolensTokenObject.key;
      const patchedContact = await contactService.update(reqData);

      return res.status(200).send({
        status: 200,
        data: {
          message: `contact verified`,
          contact_id: patchedContact.id,
          account_id: patchedContact.custom_field.cf_account_id,
          first_name: patchedContact.first_name,
          last_name: patchedContact.last_name,
          address: patchedContact.address,
          city: patchedContact.city,
          state: patchedContact.state,
          zipcode: patchedContact.zipcode,
          country: patchedContact.country,
          license_key: patchedContact.custom_field.cf_license_key,
          license_link: mailgunResponse.licenseUrl,
          account_id: account.id,
          company_name: patchedContact.custom_field.cf_company,
          mailgun_url: `${mailgunEmailUrl}${mailgunResponse.emailData.id}/history`,
        },
      });
    }
  } catch (error) {
    return res.status(400).send({
      status: 400,
      data: {
        message: `Contact not modified`,
        contact_id: request.body.contact_id,
        error: error,
      },
    });
  }
}
// Todo: refactor this method because it is used in signup service.
function getCryptolensTokenEmailContent(cryptolensTokenObject) {
  return `Customer Id: ${cryptolensTokenObject.customerId} | Token: ${cryptolensTokenObject.key}`;
}
async function getCryptolensFileUrl(cryptolensTokenObject) {
  try {
    const uploadRes = await uploadService.uploadLicence(cryptolensTokenObject);
    let text = ` You can also check out your license here: ${uploadRes.url}`;
    return {
      url: uploadRes.url,
      text,
    };
  } catch (error) {
    throw new ApiError(`Error while uploading the file; ${error}`);
  }
}

// Todo: refactor this method because it is used in signup service.
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
      path.join(__dirname, "../../../src/email-templates/signup.hbs"),
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

/**
 * Function: Search for Contact
 * @param {*} request Request
 * @param {*} res Response
 * @returns Response
 */
async function searchContact(request, res) {
  try {
    const { email, phone } = request.query;
    let contacts = [];
    let statusCode = 404;

    if (email && phone) {
      return res
        .status(400)
        .send({ status: 400, message: "please only select phone or email" });
    }

    if (email) {
      const response = await contactService.search(email);
      contacts = response.contacts.contacts;

      if (contacts.length && contacts[0].custom_field.cf_license_key) {
        statusCode = 200;
      }

      return res.status(statusCode).send({
        status: statusCode,
      });
    } else if (phone) {
      const response = await contactService.searchByPhone(phone);
      contacts = response.contacts.contacts;

      if (contacts.length) {
        statusCode = 200;
      }

      return res.status(statusCode).send({
        status: statusCode,
      });
    }

    return res.status(statusCode).send({
      status: statusCode,
    });
  } catch (error) {
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
}

module.exports = {
  createContact,
  updateContact,
  searchContact,
  sendOnboardingEmail,
};
