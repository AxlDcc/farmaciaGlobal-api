const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Payment = db.define(
  "payment",
  {
    payment_type_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    payment_type_name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

function validatePayment(entity) {
  const schema = {
    payment_type_name: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Payment = Payment;
exports.validate = validatePayment;
