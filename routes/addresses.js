const { Address, validate } = require("../models/address");
const { AdressType } = require("../models/addresstype");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const address = await Address.findAll();
  res.send(address);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const adressType = await AdressType.findOne({
    where: {
      address_type_id: req.body.address_type_id
    }
  });
  if (!adressType)
    return res
      .status(404)
      .send("The address Type with the given ID was not found.");
  let address = new Address({
    address_type_id: req.body.address_type_id,
    country: req.body.country,
    city: req.body.city,
    zone: req.body.zone,
    address_details: req.body.address_details,
    status: req.body.status
  });
  address = await address.save();
  res.send(address);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const adressType = await AdressType.findOne({
    where: {
      address_type_id: req.body.address_type_id
    }
  });
  if (!adressType)
    return res
      .status(404)
      .send("The address Type with the given ID was not found.");

  const id = req.params.id;
  const address = await Address.findOne({
    where: {
      address_id: id
    }
  });
  if (!address)
    return res.status(404).send("The address with the given ID was not found.");

  address.update({
    person_name_1: req.body.person_name_1,
    person_name_2: req.body.person_name_2,
    person_lastname_1: req.body.person_lastname_1,
    person_lastname_2: req.body.person_lastname_2,
    person_phone: req.body.person_phone,
    person_gender: req.body.person_gender,
    person_bday: req.body.person_bday,
    status: req.body.status
  });

  res.send(address);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const address = await Address.findOne({
    where: {
      address_id: id
    }
  });
  if (!address)
    return res.status(404).send("The address with the given ID was not found.");
  address.destroy();
  res.send(address);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const address = await Address.findOne({
    where: {
      address_id: id
    }
  });
  if (!address)
    return res.status(404).send("The address with the given ID was not found.");

  res.send(address);
});

module.exports = router;
