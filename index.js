const app = require("express")();
const http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("connected", "user has connected");

  socket.on("disconnect", (disconnect) => {
    console.log("user disconnected");
  });
}); // I listen on the connection event for incoming sockets and log it to the console.

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(5000, () => {
  console.log("listening on *:5000");
});
