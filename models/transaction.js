const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Transaction = db.define(
  "transactions",
  {
    transaction_id: {
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
    invoice_number: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "invoices",
        key: "invoice_number"
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      }
    },
    transaction_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "transactionstype",
        key: "transaction_type_id"
      }
    },
    payment_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "payment",
        key: "payment_type_id"
      }
    },
    auth_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    transaction_amout: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    transaction_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    transaction_desc: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);

function validateTransaction(entity) {
  const schema = {
    customer_id: Joi.number().required(),
    invoice_number: Joi.number().required(),
    user_id: Joi.number().required(),
    transaction_type_id: Joi.number()
      .integer()
      .required(),
    payment_type_id: Joi.number()
      .integer()
      .required(),
    auth_number: Joi.string().optional(),
    transaction_amout: Joi.number()
      .precision(2)
      .required(),
    transaction_date: Joi.date().required(),
    transaction_desc: Joi.string().optional()
  };
  return Joi.validate(entity, schema);
}
exports.Transaction = Transaction;
exports.validate = validateTransaction;
