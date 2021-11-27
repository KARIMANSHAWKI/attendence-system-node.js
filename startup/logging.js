const winston = require("winston");
require("express-async-errors");

const logger = () => {
  // global handler
  winston.handleExceptions(
    new winston.transports.Console({  colorize: true, prettyPrint: true}),
    new winston.transports.File({ filename: "uncaughtExceptions" })
  );

  // unhandled rejection
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  // init winston
  winston.add(winston.transports.File, { filename: "logfile.log" });
};

module.exports = logger;
