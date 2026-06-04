var net = require("net");

var count = 1;

var server = net.createServer(function (socket) {
  console.log("Cliente conectou cdo ip: " + socket.remoteAddress);
  socket.end("Hello World TCP: " + count++ + "\n");
});

server.listen(3000, "127.0.0.1");

console.log("Servidor TCP iniciado...");
