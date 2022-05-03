import winston from "winston";
import newrelicFormatter from "@newrelic/winston-enricher";

const logger = winston.createLogger({
  // format: winston.format.combine(
  //   winston.format.label({ label: "test" }),
  //   newrelicFormatter()
  // ),
  // transports: [
  //   new winston.transports.Console({
  //     level: "verbose",
  //     format: winston.format.combine(
  //       // winston.format.timestamp(),
  //       winston.format.prettyPrint(),
  //       winston.format.colorize(),
  //       winston.format.simple()
  //     ),
  //   }),
  // ],
});

logger.stream = {
  write: function (message) {
    logger.info(message);
  },
};

module.exports = logger;
