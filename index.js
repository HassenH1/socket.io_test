const app = require("express")();
const http = require("http").createServer(app);
var io = require("socket.io")(http);
const PORT = process.env.PORT || 8080;
let users = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  io.emit("connected", "a user has connected");

  socket.on("new user", (data, callback) => {
    callback(true);
    socket.username = data;
    users.push(socket.username);
    console.log("hitting here?");
    update();
  });

  socket.on("disconnect", (disconnect) => {
    io.emit("disconnected", "A user just Left");
    users.filter((user) => user !== socket.username);
  });

  socket.on("chat message", (msg) => {
    io.emit("new message", { data: msg, user: socket.username });
  });

  function update() {
    socket.emit("getting users", users);
  }
}); // I listen on the connection event for incoming sockets and log it to the console.

http.listen(PORT, "0.0.0.0", () => {
  console.log("listening on *:8080");
});
