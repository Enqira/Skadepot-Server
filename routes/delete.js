const router = require("express").Router()
const verify = require("../verifyToken")

router.delete("/delete/:id", verify, (req, res) => {
  // not finished yet
  res.send(req.params)
})

module.exports = router
