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
const deleteItem = function(document, listId, itemId) {
  const jsonData = { listId, itemId };
  fetcher(
    "/deletetodoitem",
    "POST",
    jsonData,
    loadToDoLists.bind(null, document)
  );
};

const toggleItemStatus = function(document, listId, itemId) {
  const jsonData = { listId, itemId };
  fetcher("/toggledone", "POST", jsonData, loadToDoLists.bind(null, document));
};

const addToDoItem = function(document, listId) {
  const desc = document.getElementById("itemSummary").value;
  const jsonData = { toDoItem: { desc }, listId };
  fetcher("/addtodoitem", "POST", jsonData, loadToDoLists.bind(null, document));
};

const editItem = function(document, listId, itemId) {
  const desc = document.getElementById("editDesc").value;
  const jsonData = { listId, itemId, desc };
  fetcher(
    "/changeitemdesc",
    "POST",
    jsonData,
    loadToDoLists.bind(null, document)
  );
};

const changeDesc = function(document, toDoListId) {
  const desc = document.getElementById("editDesc").value;
  const jsonData = { desc, listId: toDoListId };
  fetcher(
    "/changetododesc",
    "POST",
    jsonData,
    loadToDoLists.bind(null, document)
  );
};

const changeTitle = function(document, listId) {
  const title = document.getElementById("editTitle").value;
  const jsonData = { title, listId };
  fetcher(
    "/changetodotitle",
    "POST",
    jsonData,
    loadToDoLists.bind(null, document)
  );
};

const deleteToDoList = function(document, listId) {
  fetcher(
    "/deletetodolist",
    "POST",
    { listId },
    loadToDoLists.bind(null, document)
  );
};

const createToDoList = function(document) {
  console.log("here");
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const jsonData = { title, desc };
  fetcher(
    "/createtodolist",
    "POST",
    jsonData,
    loadToDoLists.bind(null, document)
  );
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
};

const loadToDoLists = function(document) {
  fetch("/gettodoitems")
    .then(function(response) {
      return response.json();
    })
    .then(function(myToDo) {
      const toDoListsDiv = document.getElementById("toDoLists");
      toDoListsDiv.innerHTML = "";
      getToDoLists(document, toDoListsDiv, myToDo);
    });
};
