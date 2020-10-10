const { Payment, validate } = require("../models/payment");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const payment = await Payment.findAll();
  res.send(payment);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let payment = new Payment({
    payment_type_name: req.body.payment_type_name
  });
  payment = await Payment.save();
  res.send(payment);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const payment = await Payment.findOne({
    where: {
      payment_type_id: id
    }
  });
  if (!payment)
    return res.status(404).send("The payment with the given ID was not found.");

  payment.update({
    payment_type_name: req.body.payment_type_name
  });

  res.send(payment);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const payment = await Payment.findOne({
    where: {
      payment_type_id: id
    }
  });
  if (!payment)
    return res.status(404).send("The payment with the given ID was not found.");
  payment.destroy();
  res.send(payment);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const payment = await Payment.findOne({
    where: {
      payment_type_id: id
    }
  });
  if (!payment)
    return res.status(404).send("The payment with the given ID was not found.");

  res.send(payment);
});

module.exports = router;
