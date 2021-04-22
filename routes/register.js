const router = require("express").Router()
const mongoose = require("mongoose")
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.post("/register", async (req, res) => {
  console.log(req.body)
  // Check if email exist en db
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send("Email already exists")

  // Hach password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })
  try {
    const savedUser = await user.save()
    console.log("User created")
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
