const { loadFiles, loadUsers } = require("./loadData.js");
const { handleSignup, handleLogin, handleLogout } = require("./register.js");
const { handleDashboard } = require("./dashboard.js");
const { hasSession } = require("./responder.js");
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

const express = require("express");
const app = express();
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

  cachedData.loggedInUsers = { '"2019-02-04T07:00:01.851Z"': "a" };

  app.use(readCookies);
  app.use(readPostedData);
  app.use(express.static("public/styles"));
  app.use(express.static("public/"));
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
    res.send(cachedData.publicFiles[url]);
    return;
  }
  const errorUrl = "./public/404errorPage.html";
  res.status(404).send(cachedData.publicFiles[errorUrl]);
  return;
};

const getFilePath = url => {
  return "./public" + url;
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
  requestHandler: app,
  initializeServer
};
