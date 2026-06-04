const http = require("http");
const fs = require("fs");

function readFile(response, file) {
  // O livro só fazia response.end(data); aqui tratamos erro de leitura e enviamos status HTTP.
  fs.readFile(file, "utf8", function (err, data) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Erro ao ler o arquivo: " + file);
      return;
    }

    // Mantém o JSON válido e declara o charset explicitamente.
    response.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(data);
  });
}

function callback(request, response) {
  // Substitui url.parse(request.url), que hoje gera warning no Node.
  const url = new URL(request.url, `http://${request.headers.host}`);
  const path = url.pathname;

  if (path === "/carros/classicos") {
    readFile(response, "carros_classicos.json");
  } else if (path === "/carros/esportivos") {
    readFile(response, "carros_esportivos.json");
  } else if (path === "/carros/luxo") {
    readFile(response, "carros_luxo.json");
  } else {
    // O livro respondia só com texto; aqui devolvemos 404 para rota inexistente.
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Path não mapeado: " + path);
  }
}

const server = http.createServer(callback);

server.listen(3000);

console.log("Servidor iniciado em http://localhost:3000/");
