const winston = require("winston");
const Sequelize = require("sequelize");
const config = require("config");

//const db = config.get("db");
module.exports = dbContext = new Sequelize("projectudeo", "root", "13021998", {
  host: "localhost",
  dialect: "mysql",
  operatorAliases: false
});
