const send = function(res, content, statusCode = 200, statusMessage = "Ok") {
  res.write(content);
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.end();
};

const clearCookie = function(res, cookieName) {
  res.setHeader(
    "Set-Cookie",
    `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`
  );
};

const setCookie = function(res, key, value) {
  res.setHeader("Set-Cookie", `${key}=${value}`);
};

const redirect = function(res, location) {
  res.statusCode = 302;
  res.setHeader("location", location);
  res.end();
};

const hasSession = function(loggedInUsers, sessionId) {
  return Object.keys(loggedInUsers).includes(sessionId);
};

const getUsername = function(loggedInUsers, sessionId) {
  return loggedInUsers[sessionId];
};

module.exports = {
  send,
  redirect,
  setCookie,
  clearCookie,
  hasSession,
  getUsername
};
