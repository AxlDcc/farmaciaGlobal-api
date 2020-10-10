const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Address = db.define(
  "addresses",
  {
    address_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    address_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "addresstype",
        key: "address_type_id"
      }
    },
    country: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false
    },
    zone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address_details: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

function validateAddress(entity) {
  const schema = {
    address_type_id: Joi.number().integer(),
    country: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    city: Joi.string()
      .min(3)
      .max(50)
      .required(),

    zone: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    address_details: Joi.string()
      .min(8)
      .max(100)
      .optional(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Address = Address;
exports.validate = validateAddress;
