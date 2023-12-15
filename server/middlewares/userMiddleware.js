const jwt = require("jsonwebtoken");
const User = require("../models/user");
module.exports.checkUserByToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, "my secret key", async (error, decodedId) => {
        const usr = await User.findById(decodedId.id);

        if (usr) {
          res.json({ user: usr, status: true });
          next();
        } else {
          res.json({ status: false });
          next();
        }
      });
    } else {
      res.json({ status: false });
      next();
    }
  } catch (err) {
    res.json({ error: err });
  }
};
