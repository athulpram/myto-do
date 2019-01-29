const loadToDoLists = function() {
  fetch("/gettodoitems")
    .then(function(response) {
      return response.json();
    })
    .then(function(myToDo) {
      let toDoListsDiv = document.getElementById("toDoLists");
      toDoListsDiv.innerHTML = "";
      getToDoLists(toDoListsDiv, myToDo);
    });
};

const getToDoLists = function(toDoListDiv, myToDo) {
  Object.keys(myToDo).map(toDoListKey => {
    let toDoDiv = document.createElement("div");
    const editButton = document.createElement("button");
    editButton.innerText = "\u270E";
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "\uD83D\uDDD1";
    deleteButton.onclick = deleteToDoList.bind(null, myToDo[toDoListKey]);
    toDoDiv.id = toDoListKey;
    toDoDiv.onclick = loadConsole.bind(null, myToDo[toDoListKey]);
    toDoDiv.innerText = myToDo[toDoListKey].title;
    toDoDiv.appendChild(editButton);
    toDoDiv.appendChild(deleteButton);
    toDoListDiv.appendChild(toDoDiv);
  });
  loadConsole(myToDo[Object.keys(myToDo)[0]]);
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

const generateTitle = function(title) {
  return `<div>Title:${title}</div>`;
};

const generateDesc = function(listId, desc) {
  return `<div>Description:${desc}
   <div>
          <textarea
            name="item"
            id="${listId}item"
            type="text"
            placeholder="description"
          ></textarea>
          <button onclick="addToDoItem(${listId})">Add +</button>
        </div>
  </div>`;
};

const generateItem = function(item, listId) {
  const itemDiv = document.createElement("div");
  const itemDesc = generateTitle(item.desc);
  return (
    `<input type="checkbox" onclick="toggleItemStatus(${listId},${
      item.id
    })" value="checked" ${getCheckStatus(item.isDone)}>` +
    `<button onclick="deleteItem(${listId},${item.id})">Delete Item</button>` +
    itemDesc +
    `<div>isDone:${item.isDone}</div>`
  );
};

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
  console.log("called");
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

const getCheckStatus = function(status) {
  if (status) {
    return "checked";
  }
  return "";
};

const generateItems = function(items, listId) {
  const itemsHtml = Object.keys(items).map(itemKey => {
    return generateItem(items[itemKey], listId);
  });
  return itemsHtml.join("");
};

const generateToDoDiv = function(myToDo) {
  const toDoHtml = Object.keys(myToDo).map(myToDoKey => {
    const toDo = myToDo[myToDoKey];
    const title = generateTitle(toDo.title);
    const desc = generateDesc(toDo.id, toDo.desc);
    const items = generateItems(toDo.items);
    return title + desc + items;
  });
  return toDoHtml.join("");
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

const loadConsole = function(toDoList) {
  document.getElementById("toDoListConsole").innerHTML = "";
  if (toDoList) {
    let addItemConsole = generateAddItemDiv(toDoList.id);
    document.getElementById("toDoListConsole").innerHTML =
      toDoList.desc +
      addItemConsole +
      generateItems(toDoList.items, toDoList.id);
  }
};

const generateAddItemDiv = function(listId) {
  return `<div>
    <textarea
      name="item"
      id="${listId}item"
      type="text"
      placeholder="description"
    ></textarea>
    <button onclick="addToDoItem(${listId})">Add +</button>
  </div>`;
};

window.onload = loadToDoLists;
