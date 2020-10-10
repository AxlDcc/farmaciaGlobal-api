const { ExternalAcc, validate } = require("../models/externalAcc");
const { Customer } = require("../models/customer");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const externalAcc = await ExternalAcc.findAll();
  res.send(externalAcc);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOne({
    where: {
      customer_id: req.body.customer_id
    }
  });

  if (!customer) return res.status(400).send("Invalid customer");

  const user = await User.findOne({
    where: {
      user_id: req.body.user_id
    }
  });

  if (!user) return res.status(400).send("Invalid user");

  let externalAcc = new ExternalAcc({
    customer_id: req.body.customer_id,
    user_id: req.body.user_id,
    status: req.body.status
  });
  externalAcc = await externalAcc.save();
  res.send(externalAcc);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOne({
    where: {
      customer_id: req.body.customer_id
    }
  });
  if (!customer) return res.status(400).send("Invalid customer");

  const user = await User.findOne({
    where: {
      user_id: req.body.user_id
    }
  });

  if (!user) return res.status(400).send("Invalid user");

  const id = req.params.id;
  const externalAcc = await ExternalAcc.findOne({
    where: {
      acc_number: id
    }
  });
  if (!externalAcc)
    return res
      .status(404)
      .send("The externalAcc with the given ID was not found.");

  externalAcc.update({
    customer_id: req.body.customer_id,
    user_id: req.body.user_id,
    status: req.body.status
  });

  res.send(externalAcc);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const externalAcc = await ExternalAcc.findOne({
    where: {
      acc_number: id
    }
  });
  if (!externalAcc)
    return res
      .status(404)
      .send("The externalAcc with the given ID was not found.");
  externalAcc.destroy();
  res.send(externalAcc);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const externalAcc = await ExternalAcc.findOne({
    where: {
      acc_number: id
    }
  });
  if (!externalAcc)
    return res
      .status(404)
      .send("The externalAcc with the given ID was not found.");

  res.send(externalAcc);
});

module.exports = router;
