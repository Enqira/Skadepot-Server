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

// // Search
// router.get("/search", verify, async (req, res) => {
//   // Check if user exist en db

//   const search = await DataEntry.find({ num: req.query.num })

//   console.log(req.query.num)
//   console.log(search[0].image[0].filename)

//   const uploadDate = search[0].date

//   // to get all images into an array
//   const images = search[0].image
//   let imgObj = []
//   for (let i = 0; i < images.length; i++) {
//     const imgName = images[i].filename

//     const imgDestination = images[i].destination.split("./public")
//     const splitedImgDestination = imgDestination[1]
//     const imgURL = splitedImgDestination + imgName
//     imgObj.push(imgURL)
//   }

//   // make an object that will be send
//   const responseObj = {
//     uploadDate: uploadDate,
//     imgURL: imgObj
//   }
//   res.json(search)
// })

module.exports = router
