const { redirect, clearCookie, hasSession, setCookie } = require("./responder");
const { deleteProperty, addProperty } = require("./util/objectMethods.js");
const { parseArgs } = require("./util/util");
const User = require("./user");

const handleSignup = function(storeUserDetails, cachedData, req, res) {
  const userDetails = parseArgs(req.body);
  userDetails.toDoLists = {};
  const username = userDetails.username;
  const usersData = cachedData.users;

  if (isValidUsername(usersData, username)) {
    usersData[username] = new User(userDetails);
    storeUserDetails(JSON.stringify(usersData));
    const sessionId = getTime();
    addProperty(cachedData.loggedInUsers, sessionId, username);
    setCookie(res, "sessionId", sessionId);
    redirect(res, "/dashboard.html");
    return;
  }
  redirect(res, "/index.html");
};

const getTime = function() {
  return JSON.stringify(new Date());
};

const isValidUsername = (userData, username) => {
  return !userData[username];
};

const handleLogin = function(cachedData, req, res) {
  const userDetails = parseArgs(req.body);
  const username = userDetails.username;
  const password = userDetails.password;
  const userData = cachedData.users;
  if (validateLoginCredentials(userData, username, password)) {
    if (!hasSession(cachedData.loggedInUsers, username)) {
      const sessionId = getTime();
      addProperty(cachedData.loggedInUsers, sessionId, username);
      setCookie(res, "sessionId", sessionId);
      redirect(res, "/dashboard.html");
      return;
    }
  }
  redirect(res, "/index.html");
};

const validateLoginCredentials = function(userData, username, password) {
  return (
    !isValidUsername(userData, username) &&
    userData[username].isValidPassword(password)
  );
};

const handleLogout = function(cachedData, req, res) {
  const sessionId = req.parsedCookie.sessionId;
  deleteProperty(cachedData.loggedInUsers, sessionId);
  clearCookie(res, "sessionId");
  redirect(res, "/index.html");
};

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout
};
