const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);


//Socket.io connection
io.on("connection", (socket) => {
  socket.on("User-message",(message)=>{
    io.emit('message', message)
  });
});


app.use(express.static(path.resolve('./public')))
app.get('/',(req,res)=>{
    res.sendFile('./public/index.html')
})
const PORT = 3000;

server.listen(PORT,(req,res)=>{
    console.log(`Server started at Port : ${PORT} `);
    
})