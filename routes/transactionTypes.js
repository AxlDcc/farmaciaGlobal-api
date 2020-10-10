const { TransactionType, validate } = require("../models/transactionType");
const express = require("express");
const router = express.Router();
const db = require("../startup/db");

router.get("/", async (req, res) => {
  const transactionType = await TransactionType.findAll();
  res.send(transactionType);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let transactionType = new TransactionType({
    transaction_type_name: req.body.transaction_type_name
  });
  transactionType = await transactionType.save();
  res.send(transactionType);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const transactionType = await TransactionType.findOne({
    where: {
      transaction_type_id: id
    }
  });
  if (!transactionType)
    return res.status(404).send("The Rol with the given ID was not found.");

  transactionType.update({
    transaction_type_name: req.body.transaction_type_name
  });

  res.send(transactionType);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const transactionType = await TransactionType.findOne({
    where: {
      transaction_type_id: id
    }
  });
  if (!transactionType)
    return res.status(404).send("The Rol with the given ID was not found.");
  transactionType.destroy();
  res.send(transactionType);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const transactionType = await TransactionType.findOne({
    where: {
      transaction_type_id: id
    }
  });
  if (!transactionType)
    return res
      .status(404)
      .send("The transactionType with the given ID was not found.");

  res.send(transactionType);
});

module.exports = router;
