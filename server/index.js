const express = require("express");
const cors = require("cors");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
