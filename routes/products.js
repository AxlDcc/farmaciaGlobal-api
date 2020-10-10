const { Product, validate } = require("../models/product");
const { TypeProduct } = require("../models/typeProduct");
const { Inventory } = require("../models/inventory");
const { Brand } = require("../models/brand");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const product = await Product.findAll();
  res.send(product);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const typeProduct = await TypeProduct.findOne({
    where: {
      type_products_id: req.body.type_products_id
    }
  });
  if (!typeProduct)
    return res
      .status(404)
      .send("The product Type with the given ID was not found.");

  const brand = await Brand.findOne({
    where: {
      brand_id: req.body.brand_id
    }
  });
  if (!brand)
    return res
      .status(404)
      .send("The product Type with the given ID was not found.");

  let product = new Product({
    type_products_id: req.body.type_products_id,
    brand_id: req.body.brand_id,
    product_name: req.body.product_name,
    earnings: req.body.earnings,
    product_price: req.body.product_price,
    product_img: req.body.product_img,
    status: req.body.status
  });
  product = await product.save();
  let inventory = await Inventory.findOne({
    where: {
      product_id: product.product_id
    }
  });
  if (!inventory) {
    inventory = new Inventory({
      product_id: product.product_id,
      inventory_in: "0",
      inventory_out: "0",
      inventory_stock: "0",
      status: "1"
    });
    inventory = await inventory.save();
  }

  res.send(product);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const typeProduct = await TypeProduct.findOne({
    where: {
      type_products_id: req.body.type_products_id
    }
  });
  if (!typeProduct)
    return res
      .status(404)
      .send("The product Type with the given ID was not found.");

  const brand = await Brand.findOne({
    where: {
      brand_id: req.body.brand_id
    }
  });
  if (!brand)
    return res
      .status(404)
      .send("The product Type with the given ID was not found.");

  const id = req.params.id;
  const product = await Product.findOne({
    where: {
      product_id: id
    }
  });
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  product.update({
    type_products_id: req.body.type_products_id,
    brand_id: req.body.brand_id,
    product_name: req.body.product_name,
    earnings: req.body.earnings,
    product_price: req.body.product_price,
    product_img: req.body.product_img,
    status: req.body.status
  });

  res.send(product);
});

router.delete("/:id", [auth, permission("2")], async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    where: {
      product_id: id
    }
  });
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");
  product.destroy();
  res.send(product);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await Product.findOne({
    where: {
      product_id: id
    }
  });
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

module.exports = router;
