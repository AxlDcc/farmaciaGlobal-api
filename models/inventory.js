const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Inventory = db.define(
  "inventorys",
  {
    inventory_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "product_id"
      }
    },
    inventory_in: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    inventory_out: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    inventory_stock: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: false }
);

function validateInventory(entity) {
  const schema = {
    product_id: Joi.number().required(),
    inventory_in: Joi.number().optional(),
    inventory_out: Joi.number().optional(),
    inventory_stock: Joi.number().optional(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Inventory = Inventory;
exports.validate = validateInventory;
