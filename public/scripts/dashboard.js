const loadToDoLists = function() {
  fetch("/gettodoitems")
    .then(function(response) {
      return response.json();
    })
    .then(function(myToDo) {
      let toDoView = generateToDoView(myToDo);
      document.getElementById("toDo").appendChild(toDoView);
    });
};

const generateToDoView = function(myToDo) {
  let mainToDoDiv = document.createElement("div");
  myToDo.forEach(element => mainToDoDiv.appendChild(generateToDoDiv(element)));
  return mainToDoDiv;
};

const generateToDoDiv = toDo => {
  let toDoDiv = document.createElement("div");
  toDoDiv.innerHTML = `<h2>${
    toDo.title
  }</h2><br><label> Description : </label> ${toDo.desc}`;
  let toDoItemsDiv = document.createElement("div");
  toDoItemsDiv.id = "items";
  let list = "<ul>";
  toDo.items.forEach(item => {
    list += `<li>${item.desc}</li>`;
  });
  list += "</ul>";
  toDoItemsDiv.innerHTML = list;
  toDoDiv.appendChild(toDoItemsDiv);
  toDoDiv.style.background = "yellow";
  toDoDiv.style.border = "1px solid black";
  return toDoDiv;
};
