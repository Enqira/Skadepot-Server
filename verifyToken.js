const jwt = require("jsonwebtoken");

// to verify that the user has a valid token
// it is used to create private routes
module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    console.log("logged in");
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
