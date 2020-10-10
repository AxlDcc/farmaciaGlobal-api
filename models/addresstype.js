const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const AdressType = db.define(
  "addresstype",
  {
    address_type_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type_address_desc: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

function validateAddressType(entity) {
  const schema = {
    type_address_desc: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.AdressType = AdressType;
exports.validate = validateAddressType;
