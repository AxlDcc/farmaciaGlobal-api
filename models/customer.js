const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Customer = db.define(
  "customers",
  {
    customer_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    person_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "persons",
        key: "person_id"
      }
    },
    nit: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customer_phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    customer_cellphone: {
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

function validateCustomer(entity) {
  const schema = {
    person_id: Joi.number().required(),
    nit: Joi.string()
      .min(2)
      .max(10)
      .required(),
    customer_phone: Joi.string()
      .min(3)
      .max(50)
      .optional(),

    customer_cellphone: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Customer = Customer;
exports.validate = validateCustomer;
