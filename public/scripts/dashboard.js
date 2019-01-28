const loadToDoLists = function() {
  fetch("/gettodoitems")
    .then(function(response) {
      return response.json();
    })
    .then(function(myToDo) {
      document.getElementById("toDo").innerHTML = generateToDoDiv(myToDo);
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
  const itemDesc = generateDesc(item.desc);

  return (
    itemDesc +
    `
  <div>isDone:${item.isDone}</div>
  `
  );
};

const generateItems = function(items) {
  Object.keys(itemKey => {
    return;
  });
  return;
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

window.onload = loadToDoLists;
