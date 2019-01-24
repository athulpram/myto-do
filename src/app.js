const loadData = require("./loadData.js");
const { handleSignup } = require("./register.js");
const WebFramework = require("./webFramework");
const app = new WebFramework();
const cachedData = {};

const writeToFile = function (fs, filePath, fileContents) {
  fs.writeFile(filePath, fileContents, () => { });
}

const initializeServer = function (fs) {
  const userData = './private/userData.json';
  cachedData.publicFiles = loadData("./public", fs);
  cachedData.users = JSON.parse(fs.readFileSync(userData));
  const storeUserDetails = writeToFile.bind(null, fs, userData)
  const signup = handleSignup.bind(null, storeUserDetails, cachedData);

  app.use(readPostedData);
  app.post("/signup", signup);
  app.use(requestHandler);
};

const isFilePresent = file => Object.keys(cachedData.publicFiles).includes(file);

const requestHandler = (req, res) => {
  const url = getFilePath(req.url);
  if (isFilePresent(url)) {
    send(res, cachedData.publicFiles[url]);
    return;
  }
  send(res, "file not found", 404, "error");
  return;
};

const send = function (res, content, statusCode = 200, statusMessage = "Ok") {
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

const readPostedData = function (req, res, next) {
  let postedData = '';
  req.on('data', (chunk) => {
    postedData = postedData + chunk;
  });
  req.on('end', () => {
    req.body = postedData;
    next();
  });
}
module.exports = { requestHandler: app.handleRequest.bind(app), initializeServer };
