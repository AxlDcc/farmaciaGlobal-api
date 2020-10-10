const { Person, validate } = require("../models/person");
const express = require("express");
const router = express.Router();
const db = require("../startup/db");

router.get("/", async (req, res) => {
  const persons = await Person.findAll();
  res.send(persons);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let person = new Person({
    person_name_1: req.body.person_name_1,
    person_name_2: req.body.person_name_2,
    person_lastname_1: req.body.person_lastname_1,
    person_lastname_2: req.body.person_lastname_2,
    person_phone: req.body.person_phone,
    person_gender: req.body.person_gender,
    person_bday: req.body.person_bday,
    status: req.body.status
  });
  person = await person.save();
  res.send(person);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const person = await Person.findOne({
    where: {
      person_id: id
    }
  });
  if (!person)
    return res.status(404).send("The person with the given ID was not found.");

  person.update({
    person_name_1: req.body.person_name_1,
    person_name_2: req.body.person_name_2,
    person_lastname_1: req.body.person_lastname_1,
    person_lastname_2: req.body.person_lastname_2,
    person_phone: req.body.person_phone,
    person_gender: req.body.person_gender,
    person_bday: req.body.person_bday,
    status: req.body.status
  });

  res.send(person);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({
    where: {
      person_id: id
    }
  });
  if (!person)
    return res.status(404).send("The person with the given ID was not found.");
  person.destroy();
  res.send(person);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Person.findOne({
    where: {
      person_id: id
    }
  });
  if (!person)
    return res.status(404).send("The person with the given ID was not found.");

  res.send(person);
});

module.exports = router;
