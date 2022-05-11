"use strict";

import Mixpanel from "mixpanel";

import ApiError from "../../errors/api";
import logger from "../../config/logger";

const mixpanel = Mixpanel.init(process.env.MIXPANEL_KEY);

async function sendDataToMixpanel(eventName, data) {
  try {
    return mixpanel.track(eventName, data);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  sendDataToMixpanel,
};
