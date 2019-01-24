const http = require("http");
const fs = require("fs");
const PORT = process.env.PORT || 8000;
const { requestHandler, initializeServer } = require("./src/app.js");
initializeServer(fs);
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
