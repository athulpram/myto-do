const deleteItem = function(listId, itemId) {
  fetch("/deletetodoitem", {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      listId: listId,
      itemId: itemId
    })
  }).then(response => {
    loadToDoLists();
  });
};

const toggleItemStatus = function(listId, itemId) {
  fetch("/toggledone", {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      listId: listId,
      itemId: itemId
    })
  }).then(response => {
    loadToDoLists();
  });
};

const addToDoItem = function(listId) {
  fetch("/addtodoitem", {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      toDoItem: { desc: document.getElementById(listId + "item").value },
      listId: listId
    })
  }).then(response => {
    loadToDoLists();
  });
};

const editItem = function(listId, item) {
  fetch("changeitemdesc", {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      listId,
      itemId: item.id,
      desc: document.getElementById("editDesc").value
    })
  }).then(res => {
    loadToDoLists();
  });
};

const changeDesc = function(toDoListId) {
  fetch("/changetododesc", {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      desc: document.getElementById("editDesc").value,
      listId: toDoListId
    })
  }).then(response => {
    loadToDoLists();
  });
};

const changeTitle = function(toDoListId) {
  fetch("/changetodotitle", {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: document.getElementById("editTitle").value,
      listId: toDoListId
    })
  }).then(response => {
    loadToDoLists();
  });
};

const deleteToDoList = function(toDoList) {
  fetch("/deletetodolist", {
    method: "POST",
    body: JSON.stringify({
      listId: toDoList.id
    })
  }).then(response => {
    loadToDoLists();
  });
};

const createToDoList = function() {
  fetch("/createtodolist", {
    method: "POST",
    header: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title: document.getElementById("title").value,
      desc: document.getElementById("desc").value
    })
  }).then(response => {
    loadToDoLists();
  });
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
