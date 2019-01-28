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

const generateDesc = function(desc) {
  return `<div>Description:${desc}</div>`;
};

const generateItem = function(item) {
  return;
};

const generateItems = function(items) {
  return;
};

const generateToDoDiv = function(myToDo) {
  const toDoHtml = Object.keys(myToDo).map(myToDoKey => {
    const toDo = myToDo[myToDoKey];
    const title = generateTitle(toDo.title);
    const desc = generateDesc(toDo.desc);
    const items = generateItems(toDo.items);
    return title + desc + items;
  });

  return toDoHtml.join("");
};

window.onload = loadToDoLists;
