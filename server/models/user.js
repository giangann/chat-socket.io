const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: false,
  },
  age: {
    type: Number,
    required: false,
    unique: false,
  },
});

module.exports = mongoose.model("Users", userSchema);
