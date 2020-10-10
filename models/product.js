const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Product = db.define(
  "products",
  {
    product_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type_products_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "typeproducts",
        key: "type_products_id"
      }
    },
    brand_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "brand",
        key: "brand_id"
      }
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    earnings: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    product_price: {
      type: Sequelize.DOUBLE,
      allowNull: true
    },
    product_img: {
      type: Sequelize.STRING,
      allowNull: true
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

function validateProduct(entity) {
  const schema = {
    type_products_id: Joi.number().required(),
    brand_id: Joi.number().required(),
    product_name: Joi.string()
      .min(3)
      .max(80)
      .required(),
    earnings: Joi.number()
      .precision(2)
      .required(),
    product_price: Joi.number().precision(2),
    product_img: Joi.string(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Product = Product;
exports.validate = validateProduct;
