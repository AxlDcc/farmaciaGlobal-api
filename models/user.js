const Joi = require("joi");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const db = require("../startup/db");

const User = db.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_type_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "rolltypes",
        key: "user_type_id"
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    createdBy: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

function validateUser(user) {
  const schema = {
    user_type_id: Joi.number()
      .integer()
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
    status: Joi.number()
      .integer()
      .required(),
    createdBy: Joi.string().required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
