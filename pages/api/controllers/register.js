/**
 * Register controller.
 * Contains all the business logic executed after
 * hitting any register endpoint in routes.
 */

"use strict";

import path from "path";
import dayjs from "dayjs";
import contactService from "../services/contact";
import accountService from "../services/account";
import licenseService from "../services/license";
import noteService from "../services/note";
import taskService from "../services/task";
import slackService from "../services/slack";
import { checkToken } from "../services/token";
import { hanldeCreateError } from "../services/register";
import { sendOnboardingEmail } from "./contact";
import { sendDataToMixpanel } from "../services/mixpanel";
import logger from "../config/logger";

async function create(request, res, next) {
  // Middleware: Check token beforehand
  const isAuthenticated = await checkToken(request.headers.token);
  if (!isAuthenticated) {
    return res.status(400).send({
      status: 400,
      message: "token invalid or missing",
    });
  }

  try {
    const license = request.body.license;

    const account = await createAccountIfNotExist(request.body.company);

    const data = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      phone: request.body.phone,
      jobTitle: request.body.jobTitle,
      company: request.body.company,
      cf_test_data: request.body.cf_test_data,
      sales_accounts: [
        {
          id: account.id,
          is_primary: true,
        },
      ],
      account_id: account.id,
    };
    
    // check if the contact is already there.
    let contact = await contactService.getContactIfAlreadyPresent(
      request.body.email
    );
    
    if (!contact) {
      const response = await contactService.create(data);
      if (response && response.data && response.data.contact) {
        contact = response.data.contact;
        if (typeof request.body.notify == "undefined" || request.body.notify) {
          const notificationData = {
            contactId: response.data.contact.id,
            company: request.body.company,
          };
          if(process.env.SLACK_MESSAGE_ENABLED) await slackService.sendMessage(notificationData);
        }
      } else {
        return res.status(500).send({
          status: 500,
          data: {
            message: `Contact creation failed for email: ${request.body.email}`,
          },
        });
      }
    }
    // contact exists but license status is sent and key url exists
    if (
      contact &&
      contact.custom_field &&
      contact.custom_field.cf_license_key &&
      contact.recent_note
    ) {
      return res.status(409).send({
        status: 409,
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
    } else {
      const reqData = {
        contact_id: contact.id,
        contact_first_name: contact.first_name,
        contact_last_name: contact.last_name,
        contact_cf_company: contact.custom_field.cf_company,
        contact_email: contact.email,
      };

      if (license == "disable") {
        return res.status(201).send({
          status: 201,
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

      await noteService.create(reqData.contact_id, description);
      await taskService.create({ contact_id: reqData.contact_id });
      reqData.cf_license_key = cryptolensTokenObject.key;
      reqData.cf_license_key_url = mailgunResponse.licenseUrl;
      const patchedContact = await contactService.update(reqData);

      const eventData = {
        Name: patchedContact.first_name + patchedContact.last_name,
        Email: data.email,
        Address: patchedContact.address,
        ZipCode: patchedContact.zipcode,
        City: patchedContact.city,
        State: patchedContact.state,
        Country: patchedContact.country,
      }

      sendDataToMixpanel("Sign Up", eventData);
      
      return res.status(201).send({
        status: 201,
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
    return hanldeCreateError(request, res, error);
  }
}

async function createAccountIfNotExist(company) {
  let account = await accountService.getAccountIfAlreadyPresent(company);

  if (!account) {
    account = await accountService.create({ name: company });
  }

  return account;
}

module.exports = {
  create,
};
