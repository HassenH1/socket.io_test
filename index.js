const app = require("express")();
const http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("connected", "A user has Connected");

  socket.on("new user", (data, callback) => {
    callback(true);
    socket.username = data;
  });

  socket.on("disconnect", (disconnect) => {
    io.emit("disconnected", "A user just Left");
  });

  socket.on("chat message", (msg) => {
    io.emit("new message", { data: msg, user: socket.username });
  });
}); // I listen on the connection event for incoming sockets and log it to the console.

http.listen(5000, () => {
  console.log("listening on *:5000");
});
