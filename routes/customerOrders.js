const { CustomerOrder, validate } = require("../models/customerOrder");
const { OrderStatus } = require("../models/orderStatus");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customerOrder = await CustomerOrder.findAll();
  res.send(customerOrder);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const orderStatus = await OrderStatus.findOne({
    where: {
      order_status_id: req.body.order_status_id
    }
  });
  if (!orderStatus)
    return res
      .status(404)
      .send("The customerOrder Type with the given ID was not found.");

  let customerOrder = new CustomerOrder({
    user_id: req.body.user_id,
    order_status_id: req.body.order_status_id,
    address_id: req.body.address_id,
    order_date: req.body.order_date,
    shipping_cost: req.body.shipping_cost,
    total: req.body.total
  });
  customerOrder = await customerOrder.save();
  res.send(customerOrder);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const orderStatus = await OrderStatus.findOne({
    where: {
      order_status_id: req.body.order_status_id
    }
  });
  if (!orderStatus)
    return res
      .status(404)
      .send("The customerOrder Type with the given ID was not found.");

  const id = req.params.id;
  const customerOrder = await CustomerOrder.findOne({
    where: {
      order_id: id
    }
  });
  if (!customerOrder)
    return res
      .status(404)
      .send("The customerOrder with the given ID was not found.");

  customerOrder.update({
    user_id: req.body.user_id,
    order_status_id: req.body.order_status_id,
    address_id: req.body.address_id,
    order_date: req.body.order_date,
    shipping_cost: req.body.shipping_cost,
    total: req.body.total
  });

  res.send(customerOrder);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const customerOrder = await CustomerOrder.findOne({
    where: {
      order_id: id
    }
  });
  if (!customerOrder)
    return res
      .status(404)
      .send("The customerOrder with the given ID was not found.");
  customerOrder.destroy();
  res.send(customerOrder);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const customerOrder = await CustomerOrder.findOne({
    where: {
      order_id: id
    }
  });
  if (!customerOrder)
    return res
      .status(404)
      .send("The customerOrder with the given ID was not found.");

  res.send(customerOrder);
});

module.exports = router;
