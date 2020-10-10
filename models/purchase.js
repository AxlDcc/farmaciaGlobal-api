const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Purchase = db.define(
  "purchases",
  {
    purchase_number: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    supplier_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "suppliers",
        key: "supplier_id"
      }
    },
    purchase_date: {
      type: Sequelize.DATE,
      allowNull: false
    },
    purchase_total: {
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

function validatePurchase(entity) {
  const schema = {
    supplier_id: Joi.number().required(),
    purchase_date: Joi.date(),
    purchase_total: Joi.number()
      .precision(2)
      .required(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Purchase = Purchase;
exports.validate = validatePurchase;
