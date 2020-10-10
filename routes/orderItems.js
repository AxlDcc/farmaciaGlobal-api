const { OrderItem, validate } = require("../models/orderItem");
const { CustomerOrder } = require("../models/customerOrder");
const { Product } = require("../models/product");
const { OrderStatus } = require("../models/orderStatus");
const { Inventory } = require("../models/inventory");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orderItem = await OrderItem.findAll();
  res.send(orderItem);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customerOrder = await CustomerOrder.findOne({
    where: {
      order_id: req.body.order_id
    }
  });
  if (!customerOrder)
    return res
      .status(404)
      .send("The orderItem Type with the given ID was not found.");

  const product = await Product.findOne({
    where: {
      product_id: req.body.product_id
    }
  });
  if (!product)
    return res
      .status(404)
      .send("The orderItem Type with the given ID was not found.");

  const orderStatus = await OrderStatus.findOne({
    where: {
      order_status_id: req.body.order_status_id
    }
  });
  if (!orderStatus)
    return res
      .status(404)
      .send("The orderItem Type with the given ID was not found.");

  const inventary = await Inventory.findOne({
    where: {
      product_id: req.body.product_id
    }
  });

  if (!inventary)
    return res.status(404).send("The inventary with the give ID was not found");

  let orderItem = new OrderItem({
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    order_status_id: req.body.order_status_id,
    status: req.body.status
  });
  orderItem = await orderItem.save();

  inventary.update({
    inventory_out:
      Number(inventary.inventory_out) + Number(orderItem.item_quantity)
  });

  res.send(orderItem);
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
      .send("The orderItem Type with the given ID was not found.");

  const product = await Product.findOne({
    where: {
      product_id: req.body.product_id
    }
  });
  if (!product)
    return res
      .status(404)
      .send("The orderItem Type with the given ID was not found.");

  const id = req.params.id;
  const orderItem = await OrderItem.findOne({
    where: {
      order_item_id: id
    }
  });

  if (!orderItem)
    return res
      .status(404)
      .send("The orderItem with the given ID was not found.");

  const orderStatus = await OrderStatus.findOne({
    where: {
      order_status_id: req.body.order_status_id
    }
  });
  if (!orderStatus)
    return res
      .status(404)
      .send("The orderItem Type with the given ID was not found.");

  orderItem.update({
    order_id: req.body.order_id,
    product_id: req.body.product_id,
    order_status_id: req.body.order_status_id,
    status: req.body.status
  });

  res.send(orderItem);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const orderItem = await OrderItem.findOne({
    where: {
      order_item_id: id
    }
  });
  if (!orderItem)
    return res
      .status(404)
      .send("The orderItem with the given ID was not found.");
  orderItem.destroy();
  res.send(orderItem);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const orderItem = await OrderItem.findOne({
    where: {
      order_item_id: id
    }
  });
  if (!orderItem)
    return res
      .status(404)
      .send("The orderItem with the given ID was not found.");

  res.send(orderItem);
});

module.exports = router;
