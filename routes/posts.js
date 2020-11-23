const router = require("express").Router();
const verify = require("../verifyToken");

router.get("/post", verify, (req, res) => {
  res.send(req.user);
  //   res.json({
  //     posts: {
  //       title: "titlejsjs",
  //       description: "nothing to say or do",
  //     },
  //   });
});

module.exports = router;
