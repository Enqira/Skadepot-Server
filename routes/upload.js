const router = require("express").Router();
const express = require("express");
const path = require("path");
const multer = require("multer");
const sendEmailNow = require("../nmailer.js");
const DataEntry = require("../models/dataEntry");

// setup static folder for images
router.use("./uploads/images", express.static(path.join(__dirname, "public")));

// setup multer storage and filename
const storage = multer.diskStorage({
  destination: "./uploads/images/",
  filename: function (req, file, cb) {
    cb(null, req.body.title + "-" + Date.now() + ".jpg");
  },
});

var upload = multer({ storage: storage });
// finish with multer

// variables for nodemailer
let subjectField;
let objectsToSend;

// post for /upload data
router.post("/upload", upload.array("image", 99), function (req, res, next) {
  // req.file will hold files like images
  // req.body will hold the text fields, if there were any
  const dataEntry = new DataEntry({
    title: req.body.title,
    image: req.files,
    date: new Date(),
  });
  dataEntry
    .save()
    .then((result) => {
      res.sendStatus(200);

      console.log("Data entry added");
    })
    .catch((err) => {
      console.log(err);
    });
  objectsToSend = req.files;
  subjectField = req.body.title;
  sendEmailNow.mailNow(subjectField, objectsToSend);
});

module.exports = router;
