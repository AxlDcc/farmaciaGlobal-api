const { TypeProduct, validate } = require("../models/typeProduct");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const typeProduct = await TypeProduct.findAll();
  res.send(typeProduct);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let typeProduct = new TypeProduct({
    type_name: req.body.type_name,
    status: req.body.status
  });
  typeProduct = await typeProduct.save();
  res.send(typeProduct);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const typeProduct = await TypeProduct.findOne({
    where: {
      type_products_id: id
    }
  });
  if (!typeProduct)
    return res.status(404).send("The Rol with the given ID was not found.");

  typeProduct.update({
    type_name: req.body.type_name,
    status: req.body.status
  });

  res.send(typeProduct);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const typeProduct = await TypeProduct.findOne({
    where: {
      type_products_id: id
    }
  });
  if (!typeProduct)
    return res.status(404).send("The Rol with the given ID was not found.");
  typeProduct.destroy();
  res.send(typeProduct);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const typeProduct = await TypeProduct.findOne({
    where: {
      type_products_id: id
    }
  });
  if (!typeProduct)
    return res
      .status(404)
      .send("The typeProduct with the given ID was not found.");

  res.send(typeProduct);
});

module.exports = router;
