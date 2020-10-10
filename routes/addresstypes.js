const { AdressType, validate } = require("../models/addresstype");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const addressType = await AdressType.findAll();
  res.send(addressType);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let addressType = new AdressType({
    type_address_desc: req.body.type_address_desc
  });
  addressType = await AdressType.save();
  res.send(addressType);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const addressType = await AdressType.findOne({
    where: {
      address_type_id: id
    }
  });
  if (!addressType)
    return res
      .status(404)
      .send("The adresstype with the given ID was not found.");

  addressType.update({
    type_address_desc: req.body.type_address_desc
  });

  res.send(addressType);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const addressType = await AdressType.findOne({
    where: {
      address_type_id: id
    }
  });
  if (!addressType)
    return res
      .status(404)
      .send("The adresstype with the given ID was not found.");
  addressType.destroy();
  res.send(addressType);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const addressType = await AdressType.findOne({
    where: {
      address_type_id: id
    }
  });
  if (!addressType)
    return res
      .status(404)
      .send("The adresstype with the given ID was not found.");

  res.send(addressType);
});

module.exports = router;
