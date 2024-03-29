const router = require("express").Router()
const express = require("express")
const path = require("path")
const multer = require("multer")
const sendEmailNow = require("../nmailer.js")
const DataEntry = require("../models/dataEntry")
const verify = require("../verifyToken")
const Jimp = require("jimp")

// setup static folder for images

// setup multer storage and filename
const storage = multer.diskStorage({
  destination: "./public/uploads/images/",
  filename: function (req, file, cb) {
    const imgName = `${req.body.num}-${Date.now()}.jpg`
    const imgURL = `./public/uploads/images/${imgName}`
    cb(null, imgName)
    setTimeout(() => {
      rotate(imgURL)
    }, 1000)
  }
})

var upload = multer({ storage: storage })
// finish with multer

// variables for nodemailer
// let subjectField
// let objectsToSend

// post for /upload data

router.post(
  "/upload",
  verify,
  upload.array("image", 99),
  function (req, res, next) {
    // req.files will hold files like images
    // req.body will hold the text fields, if there were any
    const dataEntry = new DataEntry({
      num: req.body.num,
      username: req.body.username,
      image: req.files,
      comment: req.body.comment,
      date: new Date()
    })
    dataEntry
      .save()
      .then(result => {
        res.sendStatus(200)

        console.log("Data entry added")
        console.log(req.body.num)
        console.log(req.body.comment)
        console.log(req.body.username)
      })
      .catch(err => {
        console.log(err)
      })
  }
)
const rotate = imgURL => {
  Jimp.read(imgURL)
    .then(image => {
      console.log("image rotated")
      return image.rotate(270).write(imgURL) // save
    })
    .catch(err => {
      console.error(err)
      console.error("jimp failed")
    })
}

module.exports = router
