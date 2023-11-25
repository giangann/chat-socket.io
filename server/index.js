const express = require("express");
const app = express();
const socket = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/userRouter");

require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.use("/api/user", userRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    cridentals: true,
  },
});

io.on("connection", (socket) => {
  console.log("have someone connect!");
  socket.broadcast.emit("new-user", "new user join our chat");
  socket.on("send-msg", (message) => {
    console.log(message);
    socket.broadcast.emit("reply-msg", message);
  });
});
