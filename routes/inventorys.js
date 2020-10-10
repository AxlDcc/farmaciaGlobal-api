const { Inventory, validate } = require("../models/inventory");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const inventory = await Inventory.findAll();
  res.send(inventory);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let inventory = new Inventory({
    product_id: req.body.product_id,
    inventory_out: req.body.inventory_out,
    inventory_stock: req.body.inventory_stock,
    status: req.body.status
  });
  inventory = await Inventory.save();
  res.send(inventory);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const inventory = await Inventory.findOne({
    where: {
      inventory_id: id
    }
  });
  if (!inventory)
    return res
      .status(404)
      .send("The inventory with the given ID was not found.");

  inventory.update({
    product_id: req.body.product_id,
    inventory_out: req.body.inventory_out,
    inventory_stock: req.body.inventory_stock,
    status: req.body.status
  });

  res.send(inventory);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const inventory = await Inventory.findOne({
    where: {
      inventory_id: id
    }
  });
  if (!inventory)
    return res
      .status(404)
      .send("The inventory with the given ID was not found.");
  Inventory.destroy();
  res.send(inventory);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const inventory = await Inventory.findOne({
    where: {
      inventory_id: id
    }
  });
  if (!inventory)
    return res
      .status(404)
      .send("The inventory with the given ID was not found.");

  res.send(inventory);
});

module.exports = router;
