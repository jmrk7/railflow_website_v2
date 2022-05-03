"use strict";

import { getApiClient } from "../services/request";

import ApiError from "../errors/api";
import accountService from "./account";
import opportunityService from "./opportunity";

import pricing from "../config/pricing.json";
import logger from "../config/logger";

function capitalize(s) {
  return s && s[0].toUpperCase() + s.slice(1).toLowerCase();
}
function addDays(theDate, days) {
  return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
}

/**
 * Service: Create new Quote
 * @param {*} data Quote data
 * @returns Promise
 */
async function create(data) {
  try {
    let price_option = 0;
    if (data.num_users != null) {
      price_option = data.num_users >> 0;
    }
    let licenseType = data.license_type.toLowerCase();
    const pricingType = pricing[licenseType];
    if (pricingType == null || pricingType == undefined) {
      return {
        error: {
          message: "Incorrect value for license_type",
        },
      };
    }
    let price = pricingType.base + pricingType.increment * price_option;

    let discount_percentage =
      pricingType[`discount_${data.license_years}_year`] || 0;
    let items_attributes = [];
    if (discount_percentage > 0) {
      items_attributes.push({
        date: new Date(),
        description: `Multi-Year Discount\n${data.license_years} Years = ${
          discount_percentage * 100
        }% Discount\n${discount_percentage * 100}% of $${
          price * data.license_years
        } = $${price * data.license_years * discount_percentage}`,
        price: -(price * data.license_years * discount_percentage),
        quantity: 1,
      });
    }
    let license_term = `${data.license_years} Years`;
    if (data.license_years == 0) {
      license_term = `Perpetual (never expiring)`;
      items_attributes.push({
        date: new Date(),
        description: `Railflow ${capitalize(data.license_type)} License \n ${
          20 * price_option
        }-${
          20 * (price_option + 1)
        } TestRail Users \n License Term: ${license_term}`,
        price: price * 4 * (1 - pricingType.discount_perpetual),
        quantity: 1,
        unit: "None",
      });
    } else {
      items_attributes.push({
        date: new Date(),
        description: `Railflow ${capitalize(data.license_type)} License \n ${
          20 * price_option
        }-${
          20 * (price_option + 1)
        } TestRail Users \n License Term: ${license_term}`,
        price: price,
        quantity: data.license_years,
        unit: "Year",
      });
    }
    const estimateData = {
      estimate: {
        connection_id: data.network.id,
        expire_date: "2022 -10-01",
        date: new Date(),
        summary: `Railflow ${capitalize(
          data.license_type
        )} Quote: ${license_term} License: ${20 * price_option}-${
          20 * (price_option + 1)
        } Users`,
        send_reminders: false,

        items_attributes: items_attributes,
      },
    };

    const apiClient = await getApiClient(process.env.HIVEAGE_BASE_URL);
    const response = await apiClient.request({
      method: "POST",
      url: "/api/estm",
      headers: {
        // TODO: use environment variable
        "Content-Type": "application/json",
      },
      data: estimateData,
      auth: {
        username: process.env.HIVEAGE_API_KEY,
        password: "",
      },
    });

    logger.info(
      `Estimate created successfully for connection_id: ${data.network.id}`
    );

    if (data.hiveage_contact_email == false) {
      const deliver_response = await apiClient.request({
        method: "POST",
        url: `/api/estm/${response.data.estimate.hash_key}/deliver`,
        headers: {
          // TODO: use environment variable
          "Content-Type": "application/json",
        },
        auth: {
          username: process.env.HIVEAGE_API_KEY,
          password: "",
        },
      });
      logger.info(
        `Estimate sent - default settings, for /api/estm/${response.data.estimate.hash_key}/deliver `
      );
    } else {
      const deliverEmailSubject = `Estimate ${
        response.data.estimate.statement_no
      } Railflow ${capitalize(
        data.license_type
      )} ${license_term} License Quote ${20 * price_option} - ${
        20 * (price_option + 1)
      } Users`;
      const deliverEmailContent = `\nHi ${data.user.display_name},
            \nA new estimate has been generated for you by Railflow Customer Support Team. Here's a quick summary:
            \nEstimate details: ${
              response.data.estimate.statement_no
            } - Railflow ${capitalize(
        data.license_type
      )} Quote: ${license_term} License: ${20 * price_option} - ${
        20 * (price_option + 1)
      } Users
            \nEstimate total: USD ${parseFloat(
              response.data.estimate.billed_total
            ).toLocaleString("en-US", 2)}
            \n\nYou can view or download a PDF by going to: http://billing.railflow.io/estm/${
              response.data.estimate.hash_key
            }
            \n\nBest regards,
            \nRailflow Customer Support Team.`;
      const deliver_response = await apiClient.request({
        method: "POST",
        url: `/api/estm/${response.data.estimate.hash_key}/deliver`,
        headers: {
          // TODO: use environment variable
          "Content-Type": "application/json",
        },
        auth: {
          username: process.env.HIVEAGE_API_KEY,
          password: "",
        },
        data: {
          delivery: {
            recipients: data.hiveage_contact_email,
            blind_copies: data.hiveage_notification_emails,
            subject: deliverEmailSubject,
            message: deliverEmailContent,
            attachment: true,
          },
        },
      });
      logger.info(`/api/estm/${response.data.estimate.hash_key}/deliver`);
    }

    const sent_response = await apiClient.request({
      method: "PUT",
      url: `/api/estm/${response.data.estimate.hash_key}`,
      headers: {
        // TODO: use environment variable
        "Content-Type": "application/json",
      },
      data: {
        estimate: {
          state: "sent",
        },
      },
      auth: {
        username: process.env.HIVEAGE_API_KEY,
        password: "",
      },
    });
    logger.info(
      `> estimate status updated to sent , url : /api/estm/${response.data.estimate.hash_key}`
    );

    const fsOpportunityData = {
      deal: {
        name: `${data.account.name}: ${capitalize(
          data.license_type
        )}: ${license_term} License: ${20 * price_option}-${
          20 * (price_option + 1)
        } Users`,
        amount: response.data.estimate.billed_total, // created quote amount
        sales_account_id: data.account.id,
        expected_close: addDays(new Date(), 30),
        deal_stage_id: 16000263413,
        custom_field: {
          cf_contact_email: data.user.email,
          cf_number_of_agents: `${20 * price_option}-${
            20 * (price_option + 1)
          }`,
        },
        contacts_added_list: [data.contact_id],
      },
    };
    let fsOpportunity = null;
    if (data.account.custom_field.cf_opportunity_id != null) {
      fsOpportunity = await opportunityService.getFsOpportunity(
        data.account.custom_field.cf_opportunity_id
      );
      if (
        !fsOpportunity ||
        fsOpportunity.amount != fsOpportunityData.deal.amount
      ) {
        fsOpportunity = await opportunityService.createFsOpportunity(
          fsOpportunityData
        );
        logger.info(`Opportunity created under account: ${data.account.id}`);
        const updatedAccount = await accountService.update(data.account.id, {
          sales_account: {
            custom_field: {
              cf_opportunity_id: `${fsOpportunity.id}`,
            },
          },
        });
      }
    } else {
      fsOpportunity = await opportunityService.createFsOpportunity(
        fsOpportunityData
      );
      logger.info(`Opportunity created under account: ${data.account.id}`);
      const updatedAccount = await accountService.update(data.account.id, {
        sales_account: {
          custom_field: {
            cf_opportunity_id: `${fsOpportunity.id}`,
          },
        },
      });
    }
    response.data.fsOpportunity = fsOpportunity;
    return response.data;
  } catch (error) {
    logger.error(`error:quote:service,`, error);
    throw new ApiError(`Error while creating estimate`);
  }
}
module.exports = {
  create,
};
