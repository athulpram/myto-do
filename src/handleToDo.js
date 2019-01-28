const getToDos = function(cachedData, req, res) {
  const username = req.parsedCookie.username;
  const userData = cachedData.users[username].toDoLists;
  res.write(JSON.stringify(userData));
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
