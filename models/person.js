const Joi = require("joi");
const Sequelize = require("sequelize");
const db = require("../startup/db");

const Person = db.define(
  "persons",
  {
    person_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    person_name_1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    person_name_2: {
      type: Sequelize.STRING
    },
    person_lastname_1: {
      type: Sequelize.STRING,
      allowNull: false
    },
    person_lastname_2: {
      type: Sequelize.STRING
    },
    person_phone: {
      type: Sequelize.STRING
    },
    person_gender: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    person_bday: {
      type: Sequelize.DATE
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

function validatePerson(person) {
  const schema = {
    person_name_1: Joi.string()
      .min(3)
      .max(50)
      .required(),
    person_name_2: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    person_lastname_1: Joi.string()
      .min(3)
      .max(50)
      .required(),

    person_lastname_2: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    person_phone: Joi.string()
      .min(8)
      .max(50)
      .optional(),
    person_gender: Joi.string()
      .max(1)
      .required(),
    person_bday: Joi.date(),
    status: Joi.number()
      .integer()
      .required()
  };
  return Joi.validate(person, schema);
}
exports.Person = Person;
exports.validate = validatePerson;
