const mongoose = require("mongoose");

// user have username, password
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: false,
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Users", userSchema);
