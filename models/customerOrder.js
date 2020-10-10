const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const CustomerOrder = db.define(
  "customerorders",
  {
    order_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      }
    },
    order_status_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "orderstatuses",
        key: "order_status_id"
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
    order_date: {
      type: Sequelize.DATE
    },
    shipping_cost: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    total: {
      type: Sequelize.DOUBLE,
      allowNull: true
    }
  },
  {
    timestamps: false
  }
);

function validateCustomerOrder(entity) {
  const schema = {
    user_id: Joi.number().required(),
    order_status_id: Joi.number().required(),
    address_id: Joi.number().required(),
    order_date: Joi.date().required(),
    shipping_cost: Joi.number().precision(2),
    total: Joi.number().precision(2)
  };
  return Joi.validate(entity, schema);
}
exports.CustomerOrder = CustomerOrder;
exports.validate = validateCustomerOrder;
