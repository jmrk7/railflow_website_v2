import logger from "../config/logger";

function hanldeCreateError(request, res, error) {
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
    },
  });
}
module.exports = {
  hanldeCreateError,
};
