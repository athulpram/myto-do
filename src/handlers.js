const { getUsername } = require("./responder");
const getToDos = function(cachedData, req, res) {
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  const userData = cachedData.users[username].toDos;
  res.write(JSON.stringify(userData));
  res.end();
};

const addToDo = function(cachedData, storeUserDetails, req, res) {
  let toDo = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].addToDoList(toDo);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const addItem = function(cachedData, storeUserDetails, req, res) {
  const { toDoItem, listId } = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].toDos[listId].addItem(toDoItem);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const deleteToDo = function(cachedData, storeUserDetails, req, res) {
  const { listId } = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].deleteToDo(listId);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const deleteItem = function(cachedData, storeUserDetails, req, res) {
  const { listId, itemId } = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].toDos[listId].deleteItem(itemId);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const changeToDoTitle = function(cachedData, storeUserDetails, req, res) {
  const { title, listId } = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].toDos[listId].changeTitle(title);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const changeToDoDesc = function(cachedData, storeUserDetails, req, res) {
  const { desc, listId } = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].toDos[listId].changeDesc(desc);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const changeItemDesc = function(cachedData, storeUserDetails, req, res) {
  const { listId, itemId, desc } = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].toDos[listId].items[itemId].changeDesc(desc);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const toggleDone = function(cachedData, storeUserDetails, req, res) {
  const { listId, itemId } = JSON.parse(req.body);
  const sessionId = req.parsedCookie.sessionId;
  const username = getUsername(cachedData.loggedInUsers, sessionId);
  cachedData.users[username].toDos[listId].items[itemId].toggleDone();
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

module.exports = {
  getToDos,
  addToDo,
  addItem,
  deleteToDo,
  deleteItem,
  changeToDoTitle,
  changeToDoDesc,
  changeItemDesc,
  toggleDone
};
