const { OrderStatus, validate } = require("../models/orderStatus");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const orderStatus = await OrderStatus.findAll();
  res.send(orderStatus);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let orderStatus = new OrderStatus({
    order_status_desc: req.body.order_status_desc
  });
  orderStatus = await orderStatus.save();
  res.send(orderStatus);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const orderStatus = await OrderStatus.findOne({
    where: {
      order_status_id: id
    }
  });
  if (!orderStatus)
    return res
      .status(404)
      .send("The orderStatus with the given ID was not found.");

  orderStatus.update({
    order_status_desc: req.body.order_status_desc
  });

  res.send(orderStatus);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const orderStatus = await OrderStatus.findOne({
    where: {
      order_status_id: id
    }
  });
  if (!orderStatus)
    return res
      .status(404)
      .send("The orderStatus with the given ID was not found.");
  orderStatus.destroy();
  res.send(orderStatus);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const orderStatus = await OrderStatus.findOne({
    where: {
      order_status_id: id
    }
  });
  if (!orderStatus)
    return res
      .status(404)
      .send("The orderStatus with the given ID was not found.");

  res.send(orderStatus);
});

module.exports = router;
