const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const {generateMessage} = require("./utils/message.js");
const {generateLocationMessage} = require("./utils/message.js");

const publicPath = path.join("__dirname", "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on("connection", (socket) => {
  console.log("new user connected");
  socket.emit("newMessage", generateMessage("Admin","Welcome to the chat app"));

  socket.broadcast.emit("newMessage", generateMessage("Admin","new user connected"));

  socket.on("disconnect", (socket)=> {
    console.log("disconnected from client");
  });

  socket.on("createMessage", (message, callback) => {
    console.log("message received", message);
    io.emit("newMessage", generateMessage(message.from,message.text));
    callback();
  });

  socket.on("createLocationMessage", (coords) => {
    console.log("Location message in progress", coords);
    io.emit("newLocationMessage", generateLocationMessage("Admin",coords.latitude,coords.longitude));
  });


});





app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`server is up and listening through port ${port}`);
});
