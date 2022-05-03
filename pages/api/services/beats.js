const MeterProvider = require("@opentelemetry/sdk-metrics-base");
const sdk = require("clear");

import { getApiClient } from "./request";
import logger from "../config/logger";

exports.registerBeatsToCryptolens = async (args) => {
  try {
    const { metadata, feature, event, key, value } = args;
    const apiClient = await getApiClient(process.env.CRYPTOLENS_BASE_URL);
    const response = await apiClient.request({
      method: "POST",
      url: `/api/ai/RegisterEvent?token=${process.env.CRYPTOLENS_API_KEY}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ProductId: process.env.PRODUCT_ID,
        Key: key,
        FeatureName: feature,
        EventName: event,
        Value: value,
        Metadata:
          typeof metadata == "object" ? JSON.stringify(metadata) : metadata,
      },
    });

    logger.info(
      `cryptolens response with Key ${key} , response ===>`,
      response.data
    );
    return response;
  } catch (error) {
    logger.error(
      `Error when Register event with cryptolens with key ${key}, ====>`,
      error
    );
    throw error;
  }
};

exports.registerBeatsToSalesPanel = async (args) => {
  try {
    const { email, category, label, metadata } = args;
    const apiClient = await getApiClient(process.env.SALESPANEL_BASE_URL);
    const response = await apiClient.request({
      method: "POST",
      url: `/api/v1/custom-activity/create/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.SALESPANEL_API_KEY}`,
      },
      data: {
        visitor_identifier: email,
        category,
        label,
        metadata,
        create_new: true,
      },
    });

    logger.info(
      `salespanel response for email ${email} , =====>`,
      response.data
    );
    return response;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
