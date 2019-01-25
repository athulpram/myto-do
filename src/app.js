const { loadFiles, loadUsers } = require("./loadData.js");
const { handleSignup, handleLogin, handleLogout } = require("./register.js");
const { handleDashboard } = require("./dashboard.js");
const { send } = require("./responder.js");
const { parseArgs } = require("./util/util.js");
const { getToDos } = require("./handleToDo.js");
const WebFramework = require("./webFramework");
const app = new WebFramework();
const cachedData = {};

const writeToFile = function(fs, filePath, fileContents) {
  fs.writeFile(filePath, fileContents, () => {});
};

const readCookies = function(req, res, next) {
  req.parsedCookie = {};
  let parsedCookie = req.headers.cookie;
  if (parsedCookie) {
    parsedCookie = parseArgs(parsedCookie);
    req.parsedCookie = parsedCookie;
  }
  next();
};

const initializeServer = function(fs) {
  const userData = "./private/userData.json";
  cachedData.publicFiles = loadFiles("./public", fs);
  cachedData.users = loadUsers(userData, fs);
  const storeUserDetails = writeToFile.bind(null, fs, userData);
  const signup = handleSignup.bind(null, storeUserDetails, cachedData);
  const login = handleLogin.bind(null, cachedData);
  const dashboardHandler = handleDashboard.bind(null, cachedData);
  app.use(readCookies);
  app.use(readPostedData);
  app.post("/signup", signup);
  app.post("/login", login);
  app.get("/logout", handleLogout);
  app.get("/dashboard.html", dashboardHandler);
  app.get("/gettodoitems",getToDos);
  app.use(requestHandler);
};

const isFilePresent = file =>
  Object.keys(cachedData.publicFiles).includes(file);

const requestHandler = (req, res) => {
  const url = getFilePath(req.url);
  if (isFilePresent(url)) {
    send(res, cachedData.publicFiles[url]);
    return;
  }
  send(res, "file not found", 404, "error");
  return;
};

const getFilePath = url => {
  if (url == "/") {
    url = "/index.html";
  }
  url = "./public" + url;
  return url;
};

const readPostedData = function(req, res, next) {
  let postedData = "";
  req.on("data", chunk => {
    postedData = postedData + chunk;
  });
  req.on("end", () => {
    req.body = postedData;
    next();
  });
};
module.exports = {
  requestHandler: app.handleRequest.bind(app),
  initializeServer
};
