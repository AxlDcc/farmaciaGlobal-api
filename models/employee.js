const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Employee = db.define(
  "employees",
  {
    employee_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    person_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "persons",
        key: "person_id"
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
    dpi: {
      type: Sequelize.STRING,
      allowNull: false
    },
    employee_cellphone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    employee_address: {
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

function validateEmployee(entity) {
  const schema = {
    person_id: Joi.number().required(),
    user_id: Joi.number().required(),
    dpi: Joi.string()
      .min(12)
      .max(50)
      .required(),
    employee_cellphone: Joi.string()
      .min(3)
      .max(50)
      .optional(),

    employee_address: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(entity, schema);
}
exports.Employee = Employee;
exports.validate = validateEmployee;
