const loadData = require("./loadData.js");
const WebFramework = require("./webFramework"); 
const app = new WebFramework();

let cachedData;
const initializeServer = function(fs) {
  cachedData = loadData("./public", fs);
  
};

const isFilePresent = file => Object.keys(cachedData).includes(file);

const requestHandler = (req, res) => {
  let url = getFilePath(req.url);
  if (isFilePresent(url)) {
    send(res, cachedData[url]);
    return;
  }
  send(res, "file not found", 404, "error");
  return;
};

const send = function(res, content, statusCode = 200, statusMessage = "Ok") {
  res.write(content);
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.end();
};

const getFilePath = url => {
  if (url == "/") {
    url = "/index.html";
  }
  url = "./public" + url;
  return url;
};

app.use(requestHandler);

module.exports = { requestHandler:app.handleRequest.bind(app), initializeServer };
