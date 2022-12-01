const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });




io.on('connection', (socket, msg) => {
  console.log('User Joined!');
  // socket.broadcast.emit('joined!');
  // socket.broadcast.emit("connection", msg + "just joined!");

  socket.on('disconnect', (msg) => {
    // socket.broadcast.emit('left!');
    console.log("User Left!")
  });

  socket.on('message', (msg) => {
    // console.log(msg);
    socket.broadcast.emit('message', msg);
  });
  
});


server.listen(3000, () => {
  console.log('listening on port:3000');
});