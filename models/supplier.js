const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Supplier = db.define(
  "suppliers",
  {
    supplier_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nit: {
      type: Sequelize.STRING,
      allowNull: false
    },
    supplier_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    supplier_phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    supplier_cellphone: {
      type: Sequelize.STRING
    },
    supplier_email: {
      type: Sequelize.STRING
    },
    supplier_address: {
      type: Sequelize.STRING,
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

function validateSuplier(entity) {
  const schema = {
    nit: Joi.string()
      .min(7)
      .max(10)
      .required(),
    supplier_name: Joi.string()
      .min(3)
      .max(50)
      .required(),

    supplier_phone: Joi.string()
      .min(3)
      .max(50)
      .required(),
    supplier_cellphone: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    supplier_email: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    supplier_address: Joi.string()
      .min(3)
      .max(50)
      .required(),

    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Supplier = Supplier;
exports.validate = validateSuplier;
