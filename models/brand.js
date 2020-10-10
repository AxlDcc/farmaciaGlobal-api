const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Brand = db.define(
  "brand",
  {
    brand_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    brand_name: {
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

function validateBrand(entity) {
  const schema = {
    brand_name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Brand = Brand;
exports.validate = validateBrand;
