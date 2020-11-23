const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
dotenv.config();
app.use(express.json());
app.use("/", require("./routes/login"));
app.use("/", require("./routes/register"));
app.use("/", require("./routes/upload"));
app.use("/", require("./routes/posts"));

// Connect mongoose
const dbURI = process.env.DB_CONNECT;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to node-skadepot server");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
