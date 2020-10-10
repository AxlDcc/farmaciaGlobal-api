const { Transaction, validate } = require("../models/transaction");
const { Customer } = require("../models/customer");
const { Invoice } = require("../models/invoice");
const { User } = require("../models/user");
const { TransactionType } = require("../models/transactionType");
const { Payment } = require("../models/payment");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const transaction = await Transaction.findAll();
  res.send(transaction);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOne({
    where: {
      customer_id: req.body.customer_id
    }
  });
  if (!customer)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const invoice = await Invoice.findOne({
    where: {
      invoice_number: req.body.invoice_number
    }
  });
  if (!invoice)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const user = await User.findOne({
    where: {
      user_id: req.body.user_id
    }
  });
  if (!user)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const transactionType = await TransactionType.findOne({
    where: {
      transaction_type_id: req.body.transaction_type_id
    }
  });
  if (!transactionType)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const payment = await Payment.findOne({
    where: {
      payment_type_id: req.body.payment_type_id
    }
  });
  if (!payment)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  let transaction = new Transaction({
    customer_id: req.body.customer_id,
    invoice_number: req.body.invoice_number,
    user_id: req.body.user_id,
    transaction_type_id: req.body.transaction_type_id,
    payment_type_id: req.body.payment_type_id,
    auth_number: req.body.auth_number,
    transaction_amout: req.body.transaction_amout,
    transaction_date: req.body.transaction_date,
    transaction_desc: req.body.transaction_desc,
    status: req.body.status
  });
  transaction = await transaction.save();
  res.send(transaction);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOne({
    where: {
      customer_id: req.body.customer_id
    }
  });
  if (!customer)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const invoice = await Invoice.findOne({
    where: {
      invoice_number: req.body.invoice_number
    }
  });
  if (!invoice)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const id = req.params.id;
  const transaction = await Transaction.findOne({
    where: {
      transaction_id: id
    }
  });

  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");

  const user = await User.findOne({
    where: {
      user_id: req.body.user_id
    }
  });
  if (!user)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const transactionType = await TransactionType.findOne({
    where: {
      transaction_type_id: req.body.transaction_type_id
    }
  });
  if (!transactionType)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  const payment = await Payment.findOne({
    where: {
      payment_type_id: req.body.payment_type_id
    }
  });
  if (!payment)
    return res
      .status(404)
      .send("The transaction Type with the given ID was not found.");

  transaction.update({
    customer_id: req.body.customer_id,
    invoice_number: req.body.invoice_number,
    user_id: req.body.user_id,
    transaction_type_id: req.body.transaction_type_id,
    payment_type_id: req.body.payment_type_id,
    auth_number: req.body.auth_number,
    transaction_amout: req.body.transaction_amout,
    transaction_date: req.body.transaction_date,
    transaction_desc: req.body.transaction_desc,
    status: req.body.status
  });

  res.send(transaction);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findOne({
    where: {
      transaction_id: id
    }
  });
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");
  transaction.destroy();
  res.send(transaction);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const transaction = await Transaction.findOne({
    where: {
      transaction_id: id
    }
  });
  if (!transaction)
    return res
      .status(404)
      .send("The transaction with the given ID was not found.");

  res.send(transaction);
});

module.exports = router;
