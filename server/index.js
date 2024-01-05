const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const messageRouter = require("./routers/messageRouter");
const cookieParser = require("cookie-parser");
const { saveUserMessages } = require("./controllers/messageController");

require("dotenv").config();

const app = express();
app.use(
  cors(
    //  if don't have 2 line below, credentials: "include" attributes in fetch in front-end will got cors error
    {
      origin: "http://localhost:3000",
      credentials: true,
    }
  )
);
app.use(express.json());
app.use(cookieParser());

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
  res.send(
    "<div> <iframe src='http://localhost:3000' width='500px' height='500px'></iframe><h1>Hello world</h1></div>"
  );
});

app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("have someone connect!");
  socket.broadcast.emit("new-user", "new user join our chat");
  socket.on("send-msg", async (message) => {
    await saveUserMessages(message);
    const targetSocket = await getSocketByUserId(message.to_user_id);

    if (targetSocket) {
      targetSocket.emit(
        checkIsChattingWith(message.from_user_id, targetSocket)
          ? "reply-msg"
          : "wait-for-seen-msg",
        message.text
      );
    }
  });
  socket.on("parse-user", (message) => {
    socket.data.user_id = message.user_id;
  });

  socket.on("user_chatting_with", (message) => {
    socket.data.user_chatting_with = message.user_chatting_with;
  });
});

async function getSocketByUserId(user_id) {
  const sockets = await io.fetchSockets();
  return sockets.filter((socket) => socket.data.user_id === user_id)[0];
}

function checkIsChattingWith(my_user_id, socket) {
  return socket.data.user_chatting_with?._id === my_user_id;
}
