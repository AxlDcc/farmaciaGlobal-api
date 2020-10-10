const { Supplier, validate } = require("../models/supplier");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const supplier = await Supplier.findAll();
  res.send(supplier);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let supplier = new Supplier({
    nit: req.body.nit,
    supplier_name: req.body.supplier_name,
    supplier_phone: req.body.supplier_phone,
    supplier_cellphone: req.body.supplier_cellphone,
    supplier_email: req.body.supplier_email,
    supplier_address: req.body.supplier_address,
    status: req.body.status
  });
  supplier = await supplier.save();
  res.send(supplier);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const supplier = await Supplier.findOne({
    where: {
      supplier_id: id
    }
  });
  if (!supplier)
    return res
      .status(404)
      .send("The supplier with the given ID was not found.");

  supplier.update({
    nit: req.body.nit,
    supplier_name: req.body.supplier_name,
    supplier_phone: req.body.supplier_phone,
    supplier_cellphone: req.body.supplier_cellphone,
    supplier_email: req.body.supplier_email,
    supplier_address: req.body.supplier_address,
    status: req.body.status
  });

  res.send(supplier);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const supplier = await Supplier.findOne({
    where: {
      supplier_id: id
    }
  });
  if (!supplier)
    return res
      .status(404)
      .send("The supplier with the given ID was not found.");
  supplier.destroy();
  res.send(supplier);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const supplier = await Supplier.findOne({
    where: {
      supplier_id: id
    }
  });
  if (!supplier)
    return res
      .status(404)
      .send("The supplier with the given ID was not found.");

  res.send(supplier);
});

module.exports = router;
