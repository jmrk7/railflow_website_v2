const pricing = require("../config/pricing.json");
const users = require("../config/user.json");
/**
 * Function: Get Pricing List
 * @param {*} request Request body
 * @param {*} res Response
 * @returns Promise
 */

exports.getPrice = async (request, res) => {
  
  if (!request.query.license_type) {
    let tiers = [];
    for (let index = 0; index < users.list_size; index++) {
      tiers.push(
        `${index * users.increment} - ${(index + 1) * users.increment}`
      );
    }
    let resPrices = {};
    for (const [key, value] of Object.entries(pricing)) {
      resPrices[key] = {
        base: value.base,
      };
    }
    return res.status(200).send({
      status: 200,
      message: "Only base price",
      users: {
        tiers: tiers,
      },
      pricing: resPrices,
    });
  }
  const data = {
    num_users: request.query.num_users,
    license_type: request.query.license_type,
    license_years: request.query.license_years,
  };
  if (
    typeof data.license_years !== "undefined" &&
    typeof data.num_users !== "undefined"
  ) {
    if (isNaN(data.num_users) || data.num_users < 0 || data.num_users > 49) {
      return res.status(400).send({
        status: 400,
        data: {
          message: "Invalid num_users: valid value is: 0-49",
        },
      });
    }
    if (
      isNaN(data.license_years) ||
      data.license_years < 0 ||
      data.license_years > 3
    ) {
      return res.status(400).send({
        status: 400,
        data: {
          message: "Invalid License_years: valid values are 0-3",
        },
      });
    }
    let resData = {};
    resData.license_type = data.license_type;
    let price_option = 0;
    if (request.query.num_users != null) {
      price_option = request.query.num_users >> 0;
    }
    let discount_amt = 0;
    const pricingType = pricing[request.query.license_type];
    if (pricingType == undefined || pricingType == null) {
      return res.status(400).send({
        data: {
          message: "Incorrect value for license_type",
        },
      });
    }
    resData.base = pricingType.base;
    resData.increment = pricingType.increment;
    resData.users = `${20 * price_option}-${20 * (price_option + 1)}`;
    resData.num_users = request.query.num_users;
    resData.base_price =
      pricingType.base + pricingType.increment * price_option;
    if (request.query.license_years == 0) {
      resData.licenseName = `Perpetual License`;
      resData.total_price = resData.base_price * 4;
      resData.discount_rate = pricingType.discount_perpetual * 100;
    } else {
      resData.licenseName = `${request.query.license_years} Year License`;
      resData.total_price = resData.base_price * request.query.license_years;
      resData.discount_rate =
        pricingType[`discount_${request.query.license_years}_year`] * 100;
    }
    if (resData.discount_rate) {
      discount_amt = (resData.total_price * resData.discount_rate) / 100;
      resData.discount_amt = Math.round(discount_amt * 100) / 100;
    }
    resData.final_price =
      resData.total_price - Math.round(discount_amt * 100) / 100;
    return res.status(200).send({
      status: 200,
      message: `Pricing detail`,
      pricing: resData,
    });
  }

  let resData = {};
  let price_options = [];
  let discount_amt = 0;
  for (let index = 0; index < users.list_size; index++) {
    price_options.push(index >> 0);
  }
  const pricingType = pricing[request.query.license_type];
  if (pricingType == undefined || pricingType == null) {
    return res.status(400).send({
      data: {
        message: "Incorrect value for license_type",
      },
    });
  }
  if (!isNaN(data.license_years) && data.license_years >= 0) {
    resData.license_type = request.query.license_type;
    resData.base = pricingType.base;
    resData.increment = pricingType.increment;
    let licenseName = `${data.license_years} Year License`;
    let licenseYear = data.license_years;
    if (data.license_years == 0) {
      licenseName = `Perpetual License`;
      licenseYear = 4;
      resData[licenseName] = {};
      resData[licenseName].discount_rate = pricingType.discount_perpetual * 100;
    } else {
      resData[licenseName] = {};
      resData[licenseName].discount_rate =
        pricingType[`discount_${data.license_years}_year`] * 100;
    }
    resData[licenseName].tiers = [];
    price_options.forEach((price_option) => {
      let tier = {};
      tier.users = `${20 * price_option}-${20 * (price_option + 1)}`;
      tier.yearly_price =
        pricingType.base + pricingType.increment * price_option;
      tier.undiscount_price = tier.yearly_price * licenseYear;
      discount_amt =
        (tier.undiscount_price * resData[licenseName].discount_rate) / 100;
      tier.discount = Math.round(discount_amt * 100) / 100;
      tier.final_price = tier.undiscount_price - tier.discount;
      resData[licenseName].tiers.push(tier);
    });
    return res.status(200).send({
      message: "Pricing detail",
      pricing: resData,
    });
  }
  for (let index = 0; index <= pricingType.years; index++) {
    resData.license_type = request.query.license_type;
    resData.base = pricingType.base;
    resData.increment = pricingType.increment;
    let licenseName = `${index} Year License`;
    let licenseYear = index;
    if (index == 0) {
      licenseName = `Perpetual License`;
      licenseYear = 4;
      resData[licenseName] = {};
      resData[licenseName].discount_rate = pricingType.discount_perpetual * 100;
    } else {
      resData[licenseName] = {};
      resData[licenseName].discount_rate =
        pricingType[`discount_${index}_year`] * 100;
    }
    resData[licenseName].tiers = [];
    if (!isNaN(data.num_users) && data.num_users >= 0 && data.num_users <= 49) {
      let price_option = data.num_users >> 0;
      let tier = {};
      tier.users = `${20 * price_option}-${20 * (price_option + 1)}`;
      tier.yearly_price =
        pricingType.base + pricingType.increment * price_option;
      tier.undiscount_price = tier.yearly_price * licenseYear;
      discount_amt =
        (tier.undiscount_price * resData[licenseName].discount_rate) / 100;
      tier.discount = Math.round(discount_amt * 100) / 100;
      tier.final_price = tier.undiscount_price - tier.discount;
      resData[licenseName].tiers.push(tier);
    } else {
      price_options.forEach((price_option) => {
        let tier = {};
        tier.users = `${20 * price_option}-${20 * (price_option + 1)}`;
        tier.yearly_price =
          pricingType.base + pricingType.increment * price_option;
        tier.undiscount_price = tier.yearly_price * licenseYear;
        discount_amt =
          (tier.undiscount_price * resData[licenseName].discount_rate) / 100;
        tier.discount = Math.round(discount_amt * 100) / 100;
        tier.final_price = tier.undiscount_price - tier.discount;
        resData[licenseName].tiers.push(tier);
      });
    }
  }
  return res.status(200).send({
    message: "Pricing detail",
    pricing: resData,
  });

};