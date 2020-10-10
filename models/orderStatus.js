const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const OrderStatus = db.define(
  "orderstatuses",
  {
    order_status_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_status_desc: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

function validateOrderStatus(entity) {
  const schema = {
    order_status_desc: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.OrderStatus = OrderStatus;
exports.validate = validateOrderStatus;
