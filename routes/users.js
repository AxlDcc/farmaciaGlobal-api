const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findOne({
    where: {
      user_id: req.user.user_id
    }
  });
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    where: {
      email: req.body.email
    }
  });

  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, [
      "user_type_id",
      "email",
      "password",
      "status",
      "createdBy"
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      user_type_id: user.user_type_id
    },
    config.get("jwtPrivateKey")
  );
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["user_id", "email"]));
});

module.exports = router;
