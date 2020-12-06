const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// post for login
router.post("/login", async (req, res) => {
  // Check if user exist en db
  const user = await User.findOne({ name: req.body.name });
  console.log(req.body.name);

  if (!user) return res.status(400).send("'name' or password is wrong");
  // check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("name or 'password' is wrong");

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  //   res.status(200).send("loged in");

  console.log("logged in");
});

module.exports = router;
