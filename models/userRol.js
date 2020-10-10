const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const UserRol = db.define(
  "rolltypes",
  {
    user_type_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_type_desc: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

function validateUserRol(entity) {
  const schema = {
    user_type_desc: Joi.string()
      .min(3)
      .max(50)
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.UserRol = UserRol;
exports.validate = validateUserRol;
