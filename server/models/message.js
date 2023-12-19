// import mongoose

// create Message schema by construct new mongoose.Schema

// create Message model by passed Message schema to mongoose.model(messageSchema) method

// export Message model

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
