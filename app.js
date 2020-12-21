const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const multer = require("multer")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const app = express()

// Add headers for CORS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*")
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  )
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "*")
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true)
  // Pass to next layer of middleware
  next()
})

dotenv.config()
app.use(express.json())
app.use("/", require("./routes/login"))
app.use("/", require("./routes/register"))
app.use("/", require("./routes/upload"))
app.use("/", require("./routes/posts"))
app.use("/", require("./routes/search"))

// Connect mongoose
const dbURI = process.env.DB_CONNECT
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log("connected to db"))
  .catch(err => console.log(err))

app.get("/", (req, res) => {
  res.send("Welcome to node-skadepot server")
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
