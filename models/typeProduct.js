const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const TypeProduct = db.define(
  "typeproducts",
  {
    type_products_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  { timestamps: false }
);

function validateTypeProduct(entity) {
  const schema = {
    type_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.TypeProduct = TypeProduct;
exports.validate = validateTypeProduct;
