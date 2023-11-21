const express = require("express");
const app = express();
const socket = require('socket.io') 
const cors = require('cors')
require('dotenv').config()

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

const io = socket (server,{
  cors:{
    origin: 'http://localhost:3000',
    cridentals:true
  }
})

io.on('connection',(socket)=>{
  console.log('have someone connect!')
  socket.on('send-msg',(message)=>{
    console.log(message)
    socket.broadcast.emit('reply-msg',message)
  })
})
