const { Customer, validate } = require("../models/customer");
const { Person } = require("../models/person");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customer = await Customer.findAll();
  res.send(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const person = await Person.findOne({
    where: {
      person_id: req.body.person_id
    }
  });
  if (!person) return res.status(400).send("Invalid person");

  let customer = new Customer({
    person_id: req.body.person_id,
    nit: req.body.nit,
    customer_phone: req.body.customer_phone,
    customer_cellphone: req.body.customer_cellphone,
    status: req.body.status
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const person = await Person.findOne({
    where: {
      person_id: req.body.person_id
    }
  });
  if (!person) return res.status(400).send("Invalid person");

  const id = req.params.id;
  const customer = await Customer.findOne({
    where: {
      customer_id: id
    }
  });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  customer.update({
    person_id: req.body.person_id,
    nit: req.body.nit,
    customer_phone: req.body.customer_phone,
    customer_cellphone: req.body.customer_cellphone,
    status: req.body.status
  });

  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findOne({
    where: {
      customer_id: id
    }
  });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  customer.destroy();
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customer = await Customer.findOne({
    where: {
      customer_id: id
    }
  });
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");

  res.send(customer);
});

module.exports = router;
