const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const ExternalAcc = db.define(
  "externalaccounts",
  {
    acc_number: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    customer_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "customers",
        key: "customer_id"
      }
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "user_id"
      }
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

function validateExternalAcc(entity) {
  const schema = {
    customer_id: Joi.number().required(),
    user_id: Joi.number().required(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.ExternalAcc = ExternalAcc;
exports.validate = validateExternalAcc;
