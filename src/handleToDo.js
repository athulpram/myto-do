const getToDos = function(req, res) {
  res.end();
};

const addToDo = function(cachedData, storeUserDetails, req, res) {
  let toDo = JSON.parse(req.body);
  let username = req.parsedCookie.username;
  cachedData.users[username].addToDoList(toDo);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

module.exports = {
  getToDos,
  addToDo
};
