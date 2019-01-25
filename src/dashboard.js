const { send, redirect } = require("./responder.js");
const handleDashboard = function(cachedData, req, res) {
  const cookie = req.parsedCookie;
  if (!cookie.username) {
    redirect(res, "/index.html");
    return;
  }
  const username = cookie.username;
  let content = cachedData.publicFiles["./public/dashboard.html"];
  content = content.replace(
    "__username__",
    cachedData.users[username].getFirstName()
  );
  send(res, content);
  return;
};

module.exports = {
  handleDashboard
};
