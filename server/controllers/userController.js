const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "my secret key", {
    expiresIn: maxAge,
  });
};

module.exports.getUser = (req, res, next) => {
  const user = { name: "an", age: 20 };

  return res.json(user);
};

module.exports.createUser = async (req, res, next) => {
  const { username, password } = req.body;

  const duplicateUser = await User.findOne({ username: username }).exec();

  if (duplicateUser) {
    res.status(500).json({ error: "duplicate user name", status: false });
    return;
  }

  const salt = await bcrypt.genSalt();
  const encryptedPw = await bcrypt.hash(password, salt);

  const usrCridental = {
    username,
    password: encryptedPw,
  };

  const newUsr = await User.create(usrCridental);

  const token = createToken(newUsr._id);
  res.cookie("jwt", token, {
    withCredentials: true,
    httpOnly: false,
    maxAge: maxAge * 1000,
  });
  res.status(201).json({ username, password });
};
