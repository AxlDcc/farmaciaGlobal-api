const { Invoice, validate } = require("../models/invoice");
const { CustomerOrder } = require("../models/customerOrder");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const invoice = await Invoice.findAll();
  res.send(invoice);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customerOrder = await CustomerOrder.findOne({
    where: {
      order_id: req.body.order_id
    }
  });
  if (!customerOrder)
    return res
      .status(404)
      .send("The invoice Type with the given ID was not found.");
  let invoice = new Invoice({
    order_id: req.body.order_id,
    serial_number: req.body.serial_number,
    invoice_total: req.body.invoice_total,
    invoice_datetime: req.body.invoice_datetime,
    status: req.body.status
  });
  invoice = await invoice.save();
  res.send(invoice);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customerOrder = await CustomerOrder.findOne({
    where: {
      order_id: req.body.order_id
    }
  });
  if (!customerOrder)
    return res
      .status(404)
      .send("The invoice Type with the given ID was not found.");

  const id = req.params.id;
  const invoice = await Invoice.findOne({
    where: {
      invoice_number: id
    }
  });
  if (!invoice)
    return res.status(404).send("The invoice with the given ID was not found.");

  invoice.update({
    order_id: req.body.order_id,
    serial_number: req.body.serial_number,
    invoice_total: req.body.invoice_total,
    invoice_datetime: req.body.invoice_datetime,
    status: req.body.status
  });

  res.send(invoice);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const invoice = await Invoice.findOne({
    where: {
      invoice_number: id
    }
  });
  if (!invoice)
    return res.status(404).send("The invoice with the given ID was not found.");
  invoice.destroy();
  res.send(invoice);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const invoice = await Invoice.findOne({
    where: {
      invoice_number: id
    }
  });
  if (!invoice)
    return res.status(404).send("The invoice with the given ID was not found.");

  res.send(invoice);
});

module.exports = router;
