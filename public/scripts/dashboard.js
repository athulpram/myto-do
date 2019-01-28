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
    toDoDiv.id = toDoListKey;
    toDoDiv.onclick = loadConsole.bind(null, myToDo[toDoListKey]);
    toDoDiv.innerText = myToDo[toDoListKey].title;
    toDoListDiv.appendChild(toDoDiv);
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

const generateItem = function(item) {
  const itemDesc = generateTitle(item.desc);
  return itemDesc + `<div>isDone:${item.isDone}</div>`;
};

const generateItems = function(items) {
  const itemsHtml = Object.keys(items).map(itemKey => {
    return generateItem(items[itemKey]);
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
  document.getElementById("toDoListConsole").innerHTML = generateItems(
    toDoList.items
  );
};

window.onload = loadToDoLists;
