// const User = require("../models/user");
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports.getUser = (req, res, next) => {
  const user = { name: "an", age: 20 };

  return res.json(user);
};

module.exports.createUser =  async (req, res, next) => {
  const newUserDoc = new User({ name: "an", age: 20 });
  const newUser = await newUserDoc.save()

  return res.json(newUser);
};
