const winston = require("winston");
require("express-async-errors");

//Export Loggin Module
module.exports = function() {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({
      filename: "uncaughtExceptions.log"
    })
  );
  process.on("unhandledRejection", ex => {
    throw ex;
  });
  const files = new winston.transports.File({ filename: "logfile.log" });
  const console = new winston.transports.Console({
    colorize: true,
    prettyPrint: true
  });

  //Agregar dependencias.
  winston.add(files);
  winston.add(console);
};
