const { Purchase, validate } = require("../models/purchase");
const { Supplier } = require("../models/supplier");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const purchase = await Purchase.findAll();
  res.send(purchase);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const supplier = await Supplier.findOne({
    where: {
      supplier_id: req.body.supplier_id
    }
  });
  if (!supplier)
    return res
      .status(404)
      .send("The purchase Type with the given ID was not found.");

  let purchase = new Purchase({
    supplier_id: req.body.supplier_id,
    purchase_date: req.body.purchase_date,
    purchase_total: req.body.purchase_total,
    status: req.body.status
  });
  purchase = await purchase.save();
  res.send(purchase);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const supplier = await Supplier.findOne({
    where: {
      supplier_id: req.body.supplier_id
    }
  });
  if (!supplier)
    return res
      .status(404)
      .send("The purchase Type with the given ID was not found.");

  const id = req.params.id;
  const purchase = await Purchase.findOne({
    where: {
      purchase_number: id
    }
  });
  if (!purchase)
    return res
      .status(404)
      .send("The purchase with the given ID was not found.");

  purchase.update({
    address_type_id: req.body.address_type_id,
    purchase_date: req.body.purchase_date,
    purchase_total: req.body.purchase_total,
    status: req.body.status
  });

  res.send(purchase);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const purchase = await Purchase.findOne({
    where: {
      purchase_number: id
    }
  });
  if (!purchase)
    return res
      .status(404)
      .send("The purchase with the given ID was not found.");
  purchase.destroy();
  res.send(purchase);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const purchase = await Purchase.findOne({
    where: {
      purchase_number: id
    }
  });
  if (!purchase)
    return res
      .status(404)
      .send("The purchase with the given ID was not found.");

  res.send(purchase);
});

module.exports = router;
