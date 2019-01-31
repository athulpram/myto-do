const { loadFiles, loadUsers } = require("./loadData.js");
const { handleSignup, handleLogin, handleLogout } = require("./register.js");
const { handleDashboard } = require("./dashboard.js");
const { redirect, send, hasSession } = require("./responder.js");
const { parseArgs } = require("./util/util.js");
const {
  getToDos,
  addToDo,
  addItem,
  deleteToDo,
  deleteItem,
  changeToDoTitle,
  changeToDoDesc,
  changeItemDesc,
  toggleDone
} = require("./handlers.js");

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

const validateUser = function(cachedData, req, res, next) {
  const sessionId = req.parsedCookie.sessionId;
  if (hasSession(cachedData.loggedInUsers, sessionId)) {
    next();
    return;
  }
  requestHandler(cachedData, req, res, next);
};

const initializeServer = function(fs) {
  const userData = "./private/userData.json";

  cachedData.publicFiles = loadFiles("./public", fs);
  cachedData.users = loadUsers(userData, fs);

  const storeUserDetails = writeToFile.bind(null, fs, userData);
  const signup = handleSignup.bind(null, storeUserDetails, cachedData);
  const login = handleLogin.bind(null, cachedData);
  const dashboardHandler = handleDashboard.bind(null, cachedData);
  const addToDoList = addToDo.bind(null, cachedData, storeUserDetails);
  const addNewItem = addItem.bind(null, cachedData, storeUserDetails);
  const deleteExistingItem = deleteItem.bind(
    null,
    cachedData,
    storeUserDetails
  );
  const deleteExistingToDo = deleteToDo.bind(
    null,
    cachedData,
    storeUserDetails
  );
  const editTitle = changeToDoTitle.bind(null, cachedData, storeUserDetails);
  const editToDoDesc = changeToDoDesc.bind(null, cachedData, storeUserDetails);
  const editItemDesc = changeItemDesc.bind(null, cachedData, storeUserDetails);

  cachedData.loggedInUsers = {};

  app.use(readCookies);
  app.use(readPostedData);
  app.post("/signup", signup);
  app.post("/login", login);
  app.get("/logout", handleLogout.bind(null, cachedData));
  app.use(validateUser.bind(null, cachedData));
  app.get("/dashboard.html", dashboardHandler);
  app.get("/gettodoitems", getToDos.bind(null, cachedData));
  app.post("/addtodoitem", addNewItem);
  app.post("/deletetodoitem", deleteExistingItem);
  app.post("/deletetodolist", deleteExistingToDo);
  app.post("/changetodotitle", editTitle);
  app.post("/changetododesc", editToDoDesc);
  app.post("/changeitemdesc", editItemDesc);
  app.post("/toggledone", toggleDone.bind(null, cachedData, storeUserDetails));
  app.post("/createtodolist", addToDoList);
  app.use(requestHandler.bind(null, cachedData));
};

const isFilePresent = file =>
  Object.keys(cachedData.publicFiles).includes(file);

const requestHandler = (cachedData, req, res) => {
  const url = getFilePath(req.url);
  if (isFilePresent(url)) {
    send(res, cachedData.publicFiles[url]);
    return;
  }
  send(res, cachedData.publicFiles["./public/404errorPage.html"], 404, "error");
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
