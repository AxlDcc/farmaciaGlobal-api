const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const TransactionType = db.define(
  "transactiontype",
  {
    transaction_type_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    transaction_type_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

function validateTransactionType(entity) {
  const schema = {
    transaction_type_name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.TransactionType = TransactionType;
exports.validate = validateTransactionType;
