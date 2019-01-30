const fetcher = function(url, method, jsonData, fetchCallback) {
  fetch(url, {
    method: method,
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(jsonData)
  }).then(response => {
    fetchCallback();
  });
};
const deleteItem = function(listId, itemId) {
  const jsonData = { listId, itemId };
  fetcher("/deletetodoitem", "POST", jsonData, loadToDoLists);
};

const toggleItemStatus = function(listId, itemId) {
  const jsonData = { listId, itemId };
  fetcher("/toggledone", "POST", jsonData, loadToDoLists);
};

const addToDoItem = function(listId) {
  const desc = document.getElementById(listId + "item").value;
  const jsonData = { toDoItem: { desc }, listId };
  fetcher("/addtodoitem", "POST", jsonData, loadToDoLists);
};

const editItem = function(listId, item) {
  const desc = document.getElementById("editDesc").value;
  const jsonData = { listId, itemId: item.id, desc };
  fetcher("/changeitemdesc", "POST", jsonData, loadToDoLists);
};

const changeDesc = function(toDoListId) {
  const desc = document.getElementById("editDesc").value;
  const jsonData = { desc, listId: toDoListId };
  fetcher("/changetododesc", "POST", jsonData, loadToDoLists);
};

const changeTitle = function(listId) {
  const title = document.getElementById("editTitle").value;
  const jsonData = { title, listId };
  fetcher("/changetodotitle", "POST", jsonData, loadToDoLists);
};

const deleteToDoList = function(listId) {
  fetcher("/deletetodolist", "POST", { listId }, loadToDoLists);
};

const createToDoList = function() {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const jsonData = { title, desc };
  fetcher("/createtodolist", "POST", jsonData, loadToDoLists);
};

const loadToDoLists = function() {
  fetch("/gettodoitems")
    .then(function(response) {
      return response.json();
    })
    .then(function(myToDo) {
      const toDoListsDiv = document.getElementById("toDoLists");
      toDoListsDiv.innerHTML = "";
      getToDoLists(toDoListsDiv, myToDo);
    });
};
