const app = require("express")();
const http = require("http").createServer(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("connected", "has connected");

  socket.on("disconnect", (disconnect) => {
    console.log("disconnected");
    io.emit("disconnected", "just left");
  });

  socket.on("chat message", (msg) => {
    io.emit("new message", { data: msg });
  });
}); // I listen on the connection event for incoming sockets and log it to the console.

http.listen(5000, () => {
  console.log("listening on *:5000");
});
