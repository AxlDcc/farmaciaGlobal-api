const Joi = require("joi");

module.exports = function() {
  Joi.object = require("joi-objectid")(Joi);
};
