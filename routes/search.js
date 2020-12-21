const router = require("express").Router()
const mongoose = require("mongoose")
const DataEntry = require("../models/dataEntry")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const verify = require("../verifyToken")

// Search
router.get("/search", verify, async (req, res) => {
  // Check if user exist en db
  const search = await DataEntry.find({ title: req.query.title })
  console.log(req.query.title)
  console.log(search[0].image[0].filename)

  const uploadDate = search[0].date
  const imgDestination = search[0].image[0].destination
  const imgName = search[0].image[0].filename
  const responseObj = {
    uploadDate: uploadDate,
    imgName: imgName
  }
  //   res.json(responseObj)
  //   res.sendFile(
  //     `C:\Users\Lapkira\Desktop\rn\node-skade-1411\\${imgDestination}\\${imgName}`
  //   )
  res.sendFile(`${imgName}`, { root: `${imgDestination}` })
})

module.exports = router
// C:\Users\Lapkira\Desktop\rn\node-skade-1411\uploads\images
