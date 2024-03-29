const router = require("express").Router()
const mongoose = require("mongoose")
const DataEntry = require("../models/dataEntry")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verify = require("../verifyToken")

// Search
router.get("/search", verify, async (req, res) => {
  // Check if user exist en db
  const search = await DataEntry.find({ num: req.query.num })
  res.json(search)
})

module.exports = router
