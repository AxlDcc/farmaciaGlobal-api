const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Invoice = db.define(
  "invoices",
  {
    invoice_number: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "customerorders",
        key: "order_id"
      }
    },
    serial_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    invoice_total: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    invoice_datetime: {
      type: Sequelize.DATE
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

function validateInvoice(entity) {
  const schema = {
    order_id: Joi.number().required(),
    serial_number: Joi.string().required(),
    invoice_total: Joi.number().precision(2),
    invoice_datetime: Joi.date().required(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Invoice = Invoice;
exports.validate = validateInvoice;
