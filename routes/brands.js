const { Brand, validate } = require("../models/brand");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const brand = await Brand.findAll();
  res.send(brand);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let brand = new Brand({
    brand_name: req.body.brand_name,
    status: req.body.status
  });
  brand = await brand.save();
  res.send(brand);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const brand = await Brand.findOne({
    where: {
      brand_id: id
    }
  });
  if (!brand)
    return res.status(404).send("The brand with the given ID was not found.");

  brand.update({
    brand_name: req.body.brand_name,
    status: req.body.status
  });

  res.send(brand);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const brand = await Brand.findOne({
    where: {
      brand_id: id
    }
  });
  if (!brand)
    return res.status(404).send("The brand with the given ID was not found.");
  Brand.destroy();
  res.send(brand);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const brand = await Brand.findOne({
    where: {
      brand_id: id
    }
  });
  if (!brand)
    return res.status(404).send("The brand with the given ID was not found.");

  res.send(brand);
});

module.exports = router;
