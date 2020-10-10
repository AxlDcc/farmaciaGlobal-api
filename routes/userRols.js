const { UserRol, validate } = require("../models/userRol");
const express = require("express");
const auth = require("../middleware/auth");
const permission = require("../middleware/permission");
const router = express.Router();

const db = require("../startup/db");

router.get("/", [auth, permission("1", "2")], async (req, res) => {
  const userRol = await UserRol.findAll();
  res.send(userRol);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let userRol = new UserRol({
    user_type_desc: req.body.user_type_desc
  });
  userRol = await userRol.save();
  res.send(userRol);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  const userRol = await UserRol.findOne({
    where: {
      user_type_id: id
    }
  });
  if (!userRol)
    return res.status(404).send("The Rol with the given ID was not found.");

  userRol.update({
    user_type_desc: req.body.user_type_desc
  });

  res.send(userRol);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userRol = await UserRol.findOne({
    where: {
      user_type_id: id
    }
  });
  if (!userRol)
    return res.status(404).send("The Rol with the given ID was not found.");
  userRol.destroy();
  res.send(userRol);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const userRol = await UserRol.findOne({
    where: {
      user_type_id: id
    }
  });
  if (!userRol)
    return res.status(404).send("The userRol with the given ID was not found.");

  res.send(userRol);
});

module.exports = router;
