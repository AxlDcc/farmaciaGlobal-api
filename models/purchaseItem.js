const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const PuruchaseItem = db.define(
  "purchasesitems",
  {
    purchase_item_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    purchase_number: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: "purchases",
        key: "purchase_number"
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
    purchase_item_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unit_price: {
      type: Sequelize.DOUBLE,
      allowNull: false
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

function validatePuruchaseItem(entity) {
  const schema = {
    purchase_number: Joi.string().required(),
    product_id: Joi.string().required(),
    purchase_item_quantity: Joi.number().optional(),
    unit_price: Joi.number().precision(2),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.PuruchaseItem = PuruchaseItem;
exports.validate = validatePuruchaseItem;
