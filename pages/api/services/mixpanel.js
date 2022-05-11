"use strict";

import Mixpanel from "mixpanel";

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
