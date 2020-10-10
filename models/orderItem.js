const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const OrderItem = db.define(
  "orderitems",
  {
    order_item_id: {
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
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id"
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
    item_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

function validateOrderItem(entity) {
  const schema = {
    order_id: Joi.number().required(),
    product_id: Joi.number().required(),
    order_status_id: Joi.number().required(),
    item_quantity: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.OrderItem = OrderItem;
exports.validate = validateOrderItem;
