const router = require("express").Router();
const mongoose = require("mongoose");
const DataEntry = require("../models/dataEntry");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");

// activity
router.get("/activity", verify, async (req, res) => {
  // Check if user exist en db
  const activity = await DataEntry.find({ username: req.query.username });
  console.log("user: " + req.query.username);
  res.json(activity);
});

module.exports = router;
