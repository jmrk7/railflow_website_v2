import { createLogger, format, transports } from "winston";
import LokiTransport from "winston-loki";
import newrelicFormatter from "@newrelic/winston-enricher";

const logger = createLogger({
  format: format.combine(format.label({ label: "test" }), newrelicFormatter()),
  transports: [
    new LokiTransport({
      host: `https://${process.env.GRAFANA_USER_ID}:${process.env.GRAFANA_API_KEY}@${process.env.GRAFANA_URL}`,
      labels: { app: process.env.GRAFANA_APP_NAME },
      json: true,
      format: format.json(),
      replaceTimestamp: true,
      onConnectionError: (err) => console.error(err),
    }),
    new transports.Console({
      format: format.combine(format.simple(), format.colorize()),
    }),
  ],
});

logger.stream = {
  write: function (message) {
    logger.info(message);
  },
};

module.exports = logger;
