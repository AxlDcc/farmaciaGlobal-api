const { CustomerAdress, validate } = require("../models/customerAddress");
const { Customer } = require("../models/customer");
const { Address } = require("../models/address");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customerAdress = await CustomerAdress.findAll();
  res.send(customerAdress);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const address = await Address.findOne({
    where: {
      address_id: req.body.address_id
    }
  });
  if (!address)
    return res
      .status(404)
      .send("The customerAdress Type with the given ID was not found.");

  const customer = await Customer.findOne({
    where: {
      customer_id: req.body.customer_id
    }
  });
  if (!customer)
    return res
      .status(404)
      .send("The customerAdress Type with the given ID was not found.");

  let customerAdress = new CustomerAdress({
    address_type_id: req.body.address_type_id,
    country: req.body.country,
    city: req.body.city,
    zone: req.body.zone,
    address_details: req.body.address_details,
    status: req.body.status
  });
  customerAdress = await customerAdress.save();
  res.send(customerAdress);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const address = await Address.findOne({
    where: {
      address_id: req.body.address_id
    }
  });
  if (!address)
    return res
      .status(404)
      .send("The customerAdress Type with the given ID was not found.");

  const customer = await Customer.findOne({
    where: {
      customer_id: req.body.customer_id
    }
  });
  if (!customer)
    return res
      .status(404)
      .send("The customerAdress Type with the given ID was not found.");

  const id = req.params.id;
  const customerAdress = await CustomerAdress.findOne({
    where: {
      customer_address_id: id
    }
  });
  if (!customerAdress)
    return res
      .status(404)
      .send("The customerAdress with the given ID was not found.");

  customerAdress.update({
    address_type_id: req.body.address_type_id,
    country: req.body.country,
    city: req.body.city,
    zone: req.body.zone,
    address_details: req.body.address_details,
    status: req.body.status
  });

  res.send(customerAdress);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const customerAdress = await CustomerAdress.findOne({
    where: {
      customer_address_id: id
    }
  });
  if (!customerAdress)
    return res
      .status(404)
      .send("The customerAdress with the given ID was not found.");
  customerAdress.destroy();
  res.send(customerAdress);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customerAdress = await CustomerAdress.findOne({
    where: {
      customer_address_id: id
    }
  });
  if (!customerAdress)
    return res
      .status(404)
      .send("The customerAdress with the given ID was not found.");

  res.send(customerAdress);
});

module.exports = router;
