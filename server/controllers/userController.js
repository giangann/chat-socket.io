const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "kishan sheth super secret key", {
    expiresIn: maxAge,
  });
};

module.exports.getUser = (req, res, next) => {
  const user = { name: "an", age: 20 };

  return res.json(user);
};

module.exports.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt();
  const encryptedPw = await bcrypt.hash(password, salt);

  const usrCridental = {
    username,
    password: encryptedPw,
  };

  const newUsr = new User(usrCridental);
  const respond = await newUsr.save();
  console.log("newUsr", newUsr);

  const token = createToken(newUsr._id);
  console.log("token", token);
  res.cookie("jwt", token, {
    withCredentials: true,
    httpOnly: false,
    maxAge: maxAge * 1000,
  });
  res.status(201).json({ username, password });
};
