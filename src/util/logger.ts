import Winston from 'winston';
import config from './../config/config';

let transportlist = [];
let level = "error"

if (process.env.NODE_ENV !== "production") {
  level = "debug";
  transportlist.push(new Winston.transports.Console({
    level: process.env.NODE_ENV === "production" ? "error" : "debug"
  }));
}

transportlist.push(new Winston.transports.File({ filename: "debug.log", level: "debug" }));


const options: Winston.LoggerOptions = {
  'format': Winston.format.combine(
    Winston.format.timestamp({
      'format': 'YYYY-MM-DD HH:mm:ss'
    }),
    Winston.format.errors({ 'stack': true }),
    Winston.format.json()
  ),
  'defaultMeta': { 'label': config.name },
  transports: transportlist
};

const logger = Winston.createLogger(options);


if (process.env.NODE_ENV !== "production") {
  logger.debug("Logging initialized at debug level");
}

export default logger;
