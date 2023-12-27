const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "my secret key", {
    expiresIn: maxAge,
  });
};

module.exports.getAllUserEscapeMe = async (req, res, next) => {
  const { my_user_id } = req.query;

  const listUsers = await User.find({ _id: { $ne: my_user_id } }).exec();

  return res.json(listUsers);
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

module.exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username }).exec();

  if (!user) {
    return res.status(500).json({ error: "no user found", status: false });
  } else {
    const comparedPassword = await bcrypt.compare(password, user.password);
    if (!comparedPassword) {
      return res.status(500).json({ error: "wrong password", status: false });
    }

    const token = createToken(user._id);
    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ user, status: true });
  }
};

module.exports.logout = async (req, res, next) => {};
