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


const addToDoItem = function(cachedData, storeUserDetails, req, res) {
  const { toDoItem, listId } = JSON.parse(req.body);
  const username = req.parsedCookie.username;
  cachedData.users[username].toDoLists[listId].addItem(toDoItem);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const deleteToDoList = function(cachedData, storeUserDetails, req, res) {
  const { listId } = JSON.parse(req.body);
  const username = req.parsedCookie.username;
  cachedData.users[username].deleteToDoList(listId);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const deleteToDoItem = function(cachedData, storeUserDetails, req, res) {
  const { listId, itemId } = JSON.parse(req.body);
  const username = req.parsedCookie.username;
  cachedData.users[username].toDoLists[listId].deleteItem(itemId);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const changeToDoTitle = function(cachedData, storeUserDetails, req, res) {
  const { title, listId } = JSON.parse(req.body);
  const username = req.parsedCookie.username;
  cachedData.users[username].toDoLists[listId].changeTitle(title);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const changeToDoDesc = function(cachedData, storeUserDetails, req, res) {
  const { desc, listId } = JSON.parse(req.body);
  const username = req.parsedCookie.username;
  cachedData.users[username].toDoLists[listId].changeDesc(desc);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const changeItemDesc = function(cachedData, storeUserDetails, req, res) {
  const { listId, itemId, desc } = JSON.parse(req.body);
  const username = req.parsedCookie.username;
  cachedData.users[username].toDoLists[listId].items[itemId].changeDesc(desc);
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

const toggleDone = function(cachedData, storeUserDetails, req, res) {
  const { listId, itemId } = JSON.parse(req.body);
  const username = req.parsedCookie.username;
  cachedData.users[username].toDoLists[listId].items[itemId].toggleDone();
  storeUserDetails(JSON.stringify(cachedData.users));
  res.end();
};

module.exports = {
  getToDos,
  addToDo,
  addToDoItem,
  deleteToDoList,
  deleteToDoItem,
  changeToDoTitle,
  changeToDoDesc,
  changeItemDesc,
  toggleDone
};
