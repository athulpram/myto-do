const { redirect } = require("./responder");
const parsePostedData = function(postedData) {
  let data = postedData.split("&");
  let parsedData = {};
  data.forEach(keyVal => {
    [key, val] = keyVal.split("=");
    parsedData[key] = val;
  });
  return parsedData;
};

const handleSignup = function(storeUserDetails, cachedData, req, res) {
  const userDetails = parsePostedData(req.body);
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
  const userDetails = parsePostedData(req.body);
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

module.exports = {
  handleSignup,
  handleLogin
};
