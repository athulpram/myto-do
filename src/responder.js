const send = function(res, content, statusCode = 200, statusMessage = "Ok") {
  res.write(content);
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.end();
};

const redirect = function(res, location) {
  res.statusCode = 302;
  res.setHeader("location", location);
  res.end();
};

module.exports = { send, redirect };
