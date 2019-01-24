const http = require("http");
const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  res.write("starting todo project");
  res.end();
});

server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
