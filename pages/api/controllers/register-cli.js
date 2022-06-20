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
import { sendOnboardingEmailByFree } from "./contact";
import { sendDataToMixpanel } from "../services/mixpanel";
import logger from "../config/logger";

import { searchCustomer, createUser } from "../services/stripe/stripe";

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
      } else {
        return res.status(500).send({
          status: 500,
          data: {
            message: `Contact creation failed for email: ${request.body.email}`,
          },
        });
      }
    }

    const notificationData = {
      header: "(Free CLI)",
      contactId: response.data.contact.id,
      company: request.body.company,
    };
    if(process.env.SLACK_MESSAGE_ENABLED) await slackService.sendMessage(notificationData);

    const stripeAccountData = {
      name: data.firstName + " " + data.lastName,
      email: contact.email,
      phone: contact.mobile_number,
      metadata: {
        "CRM account_id": contact.custom_field.cf_account_id,
        "CRM contact_id": contact.id,
      },
      description: contact.jobTitle,
    };

    var customer = await searchCustomer(contact.email);
    customer.length === 0
      ? (customer = await createUser(stripeAccountData))
      : (customer = customer[0]);

    const reqData = {
      contact_id: contact.id,
      contact_first_name: contact.first_name,
      contact_last_name: contact.last_name, 
      contact_cf_company: contact.custom_field.cf_company,
      contact_email: contact.email,
    };

    const cryptolensTokenObject = await licenseService.getCryptolensTokenByCli(
      reqData,
      "0"
    );

    const mailgunResponse = await sendOnboardingEmailByFree(
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
    let eventData = {};
    // contact exists but license status is sent and key url exists

    reqData.cf_free_license_key = cryptolensTokenObject.key;
    reqData.cf_free_license_key_url = mailgunResponse.licenseUrl;
    const patchedContact = await contactService.updateByFree(reqData);

    eventData = {
      Name: patchedContact.first_name + patchedContact.last_name,
      Email: data.email,
      Address: patchedContact.address,
      ZipCode: patchedContact.zipcode,
      City: patchedContact.city,
      State: patchedContact.state,
      Country: patchedContact.country,
    };

    sendDataToMixpanel("Free CLI", eventData);

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
        license_key: cryptolensTokenObject.key,
        license_link: mailgunResponse.licenseUrl,

        account_id: account.id,
        company_name: patchedContact.custom_field.cf_company,
        mailgun_url: `${mailgunEmailUrl}${mailgunResponse.emailData.id}/history`,
      },
    });
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
