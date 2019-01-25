const { redirect } = require("./responder");
const { parseArgs } = require("./util/util");

const handleSignup = function(storeUserDetails, cachedData, req, res) {
  const userDetails = parseArgs(req.body);
  const username = userDetails.username;
  const usersData = cachedData.users;

  if (isValidUsername(usersData, username)) {
    usersData[username] = userDetails;
    storeUserDetails(JSON.stringify(usersData));
    res.setHeader("Set-Cookie", `username=${username}`);
    redirect(res, "/dashboard.html");
    return;
  }
  redirect(res, "/index.html");
};

const isValidUsername = (userData, username) => {
  return !userData[username];
};

const handleLogin = function(cachedData, req, res) {
  const userDetails = parseArgs(req.body);
  const username = userDetails.username;
  const password = userDetails.password;
  const userData = cachedData.users;
  if (
    !isValidUsername(userData, username) &&
    userData[username].isValidPassword(password)
  ) {
    res.setHeader("Set-Cookie", `username=${username}`);
    redirect(res, "/dashboard.html");
    return;
  }
  redirect(res, "/index.html");
};

const handleLogout = function(req, res) {
  res.setHeader(
    "Set-Cookie",
    "username=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
  );
  redirect(res, "/index.html");
};

module.exports = {
  handleSignup,
  handleLogin,
  handleLogout
};
