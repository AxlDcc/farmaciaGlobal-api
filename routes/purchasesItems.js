const { PuruchaseItem, validate } = require("../models/purchaseItem");
const { Purchase } = require("../models/purchase");
const { Product } = require("../models/product");
const { Inventory } = require("../models/inventory");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const purchaseItem = await PuruchaseItem.findAll();
  res.send(purchaseItem);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let purchase = await Purchase.findOne({
    where: {
      purchase_number: req.body.purchase_number
    }
  });
  if (!purchase)
    return res
      .status(404)
      .send("The purchaseItem Type with the given ID was not found.");

  const product = await Product.findOne({
    where: {
      product_id: req.body.product_id
    }
  });
  if (!product)
    return res
      .status(404)
      .send("The purchaseItem Type with the given ID was not found.");

  //Validacion Inventario
  const inventary = await Inventory.findOne({
    where: {
      product_id: req.body.product_id
    }
  });

  if (!inventary)
    return res.status(404).send("The inventary with the give ID was not found");

  let purchaseItem = new PuruchaseItem({
    purchase_number: req.body.purchase_number,
    product_id: req.body.product_id,
    purchase_item_quantity: req.body.purchase_item_quantity,
    unit_price: req.body.unit_price,
    status: req.body.status
  });
  purchaseItem = await purchaseItem.save();

  inventary.update({
    inventory_in:
      Number(inventary.inventory_in) +
      Number(purchaseItem.purchase_item_quantity)
  });

  product.update({
    product_price: Number(
      Number(purchaseItem.unit_price) * Number(product.earnings) +
        Number(purchaseItem.unit_price)
    ).toFixed(2)
  });
  purchase.update({
    purchase_total: Number(
      Number(purchaseItem.purchase_item_quantity) *
        Number(purchaseItem.unit_price) +
        Number(purchase.purchase_total)
    ).toFixed(2)
  });

  res.send(purchaseItem);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const purchase = await Purchase.findOne({
    where: {
      purchase_number: req.body.purchase_number
    }
  });
  if (!purchase)
    return res
      .status(404)
      .send("The purchaseItem Type with the given ID was not found.");

  const product = await Product.findOne({
    where: {
      product_id: req.body.product_id
    }
  });
  if (!product)
    return res
      .status(404)
      .send("The purchaseItem Type with the given ID was not found.");

  const id = req.params.id;
  const purchaseItem = await PuruchaseItem.findOne({
    where: {
      purchase_item_id: id
    }
  });
  if (!purchaseItem)
    return res
      .status(404)
      .send("The purchaseItem with the given ID was not found.");

  purchaseItem.update({
    purchase_number: req.body.purchase_number,
    product_id: req.body.product_id,
    purchase_item_quantity: req.body.purchase_item_quantity,
    unit_price: req.body.unit_price,
    status: req.body.status
  });

  res.send(purchaseItem);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const purchaseItem = await PuruchaseItem.findOne({
    where: {
      purchase_item_id: id
    }
  });
  if (!purchaseItem)
    return res
      .status(404)
      .send("The purchaseItem with the given ID was not found.");
  purchaseItem.destroy();
  res.send(purchaseItem);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const purchaseItem = await PuruchaseItem.findOne({
    where: {
      purchase_item_id: id
    }
  });
  if (!purchaseItem)
    return res
      .status(404)
      .send("The purchaseItem with the given ID was not found.");

  res.send(purchaseItem);
});

module.exports = router;
