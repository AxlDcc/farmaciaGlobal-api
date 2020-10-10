const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const CustomerAdress = db.define(
  "customeraddresses",
  {
    customer_address_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "customer_id"
      }
    },
    address_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "addresses",
        key: "address_id"
      }
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

function validateCustomerAddress(entity) {
  const schema = {
    customer_id: Joi.number().required(),
    address_id: Joi.number().required(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.CustomerAdress = CustomerAdress;
exports.validate = validateCustomerAddress;
