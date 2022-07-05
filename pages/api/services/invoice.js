"use strict";

const { getApiClient } = require("../services/request");
const ApiError = require("../errors/api");
const accountService = require("./account");
const opportunityService = require("./opportunity");
const pricing = require("../config/pricing.json");
const logger = require("../config/logger");

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

    let discount_percentage = pricingType[`discount_${data.license_years}_year`] || 0;
    let items_attributes = [];
    if (discount_percentage > 0) {
      items_attributes.push({
        date: new Date(),
        description: `Multi-Year Discount\n${data.license_years} Years = ${
          discount_percentage * 100
        }% Discount\n${discount_percentage * 100}% of $${price * data.license_years} = $${
          price * data.license_years * discount_percentage
        }`,
        price: -(price * data.license_years * discount_percentage),
        quantity: 1,
      });
    }
    let license_term = `${data.license_years} Years`;
    if (data.license_years == 0) {
      license_term = `Perpetual (never expiring)`;
      items_attributes.push({
        date: new Date(),
        description: `Railflow ${capitalize(data.license_type)} License \n ${10 * price_option}-${
          10 * (price_option + 1)
        } TestRail Users \n License Term: ${license_term}`,
        price: price * 4 * (1 - pricingType.discount_perpetual),
        quantity: 1,
        unit: "None",
      });
    } else {
      items_attributes.push({
        date: new Date(),
        description: `Railflow ${capitalize(data.license_type)} License \n ${10 * price_option}-${
          10 * (price_option + 1)
        } TestRail Users \n License Term: ${license_term}`,
        price: price,
        quantity: data.license_years,
        unit: "Year",
      });
    }

    const fsOpportunityData = {
      deal: {
        name: `${data.account.name}: ${capitalize(data.license_type)}: ${license_term} License: ${
          10 * price_option
        }-${10 * (price_option + 1)} Users`,
        amount: data.estimate.billed_total, // created quote amount
        sales_account_id: data.account.id,
        expected_close: addDays(new Date(), 30),
        deal_stage_id: 16000263413,
        custom_field: {
          cf_contact_email: data.user.email,
          cf_number_of_agents: `${10 * price_option}-${10 * (price_option + 1)}`,
        },
        contacts_added_list: [data.contact_id],
      },
    };
    let fsOpportunity = null;
    if (data.account.custom_field.cf_opportunity_id != null) {
      fsOpportunity = await opportunityService.getFsOpportunity(
        data.account.custom_field.cf_opportunity_id
      );
      if (!fsOpportunity || fsOpportunity.amount != fsOpportunityData.deal.amount) {
        fsOpportunity = await opportunityService.createFsOpportunity(fsOpportunityData);
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
      fsOpportunity = await opportunityService.createFsOpportunity(fsOpportunityData);
      logger.info(`Opportunity created under account: ${data.account.id}`);
      const updatedAccount = await accountService.update(data.account.id, {
        sales_account: {
          custom_field: {
            cf_opportunity_id: `${fsOpportunity.id}`,
          },
        },
      });
    }
    data.fsOpportunity = fsOpportunity;
    return data;
  } catch (error) {
    logger.error(`error:Invoice:service,`, error);
    throw new ApiError(`Error while creating estimate`);
  }
}
module.exports = {
  create,
};
