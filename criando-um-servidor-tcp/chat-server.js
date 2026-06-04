var net = require("net");
var sockets = [];
var port = 8000;
var guestId = 0;

var server = net.createServer(function (socket) {
  socket.setEncoding("utf8");
  socket.buffer = "";

  guestId++;

  socket.nickname = "Guest" + guestId;
  var clientName = socket.nickname;

  sockets.push(socket);

  console.log(clientName + " joined this chat.");

  socket.write("Welcome to telnet chat!\r\n");

  broadcast(clientName, clientName + " joined this chat.\n");

  // Junta o que chegar até ter uma linha completa.
  socket.on("data", function (data) {
    socket.buffer += data;

    var lines = socket.buffer.split(/\r?\n/);
    socket.buffer = lines.pop();

    lines.forEach(function (line) {
      var message = clientName + "> " + line + "\r\n";

      broadcast(clientName, message);

      process.stdout.write(message);
    });
  });

  socket.on("end", function () {
    var message = clientName + " left this chat\r\n";

    process.stdout.write(message);

    removeSocket(socket);

    broadcast(clientName, message);
  });

  socket.on("error", function (error) {
    console.log("Socket got problems: ", error.message);
  });
});

function broadcast(from, message) {
  if (sockets.length === 0) {
    process.stdout.write("Everyone left the chat");
    return;
  }

  // Envia para os outros clientes, mas não para quem digitou.
  sockets.forEach(function (socket, index, array) {
    if (socket.nickname === from) return;

    socket.write(message);
  });
}

function removeSocket(socket) {
  sockets.splice(sockets.indexOf(socket), 1);
}

server.on("error", function (error) {
  console.log("So we got problems!", error.message);
});

server.listen(port, function () {
  console.log("Server listening at http://localhost:" + port);
});
