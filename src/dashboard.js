const { send, redirect, hasSession, getUsername } = require("./responder.js");
const handleDashboard = function(cachedData, req, res) {
  const sessionId = req.parsedCookie.sessionId;

  if (hasSession(cachedData.loggedInUsers, sessionId)) {
    const username = getUsername(cachedData.loggedInUsers, sessionId);
    let content = cachedData.publicFiles["./public/dashboard.html"];
    content = content.replace(
      "__username__",
      cachedData.users[username].getFirstName()
    );
    send(res, content);
    return;
  }
  redirect(res, "/index.html");
  return;
};

module.exports = {
  handleDashboard
};
