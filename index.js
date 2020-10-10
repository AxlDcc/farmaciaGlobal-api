const winston = require("winston");
const express = require("express");
const db = require("./startup/db");
const app = express();

require("./startup/loggin")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/config")();
//require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
db.authenticate()
  .then(() => winston.info("Db connected..."))
  .catch(err => winston.error("Error:" + err));
