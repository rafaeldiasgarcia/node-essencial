var http = require("http");

var callback = function (request, response) {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World Node callback!\n");
};

var server = http.createServer(callback);

server.listen(3000);

console.log("Servidor iniciado...");
