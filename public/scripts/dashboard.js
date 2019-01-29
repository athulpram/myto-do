const PENCIL = "\u270E";
const WASTEBIN = "\uD83D\uDDD1";

const getToDoLists = function(toDoListDiv, myToDo) {
  Object.keys(myToDo).map(toDoListKey => {
    let toDoDiv = document.createElement("div");
    toDoDiv.id = toDoListKey;

    const editButton = document.createElement("button");
    editButton.innerText = PENCIL;
    editButton.onclick = loadEditConsole.bind(null, myToDo[toDoListKey]);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = WASTEBIN;
    deleteButton.onclick = deleteToDoList.bind(null, myToDo[toDoListKey]);

    const toDoHeading = document.createElement("div");
    toDoHeading.innerText = myToDo[toDoListKey].title;
    toDoHeading.onclick = loadConsole.bind(null, myToDo[toDoListKey]);

    toDoDiv.appendChild(toDoHeading);
    toDoDiv.appendChild(editButton);
    toDoDiv.appendChild(deleteButton);
    toDoDiv.className = "toDoListNav";
    toDoListDiv.appendChild(toDoDiv);
  });
  loadConsole(myToDo[Object.keys(myToDo)[0]]);
};

const loadEditConsole = function(toDoList) {
  document.getElementById("toDoListConsole").innerHTML = "";
  if (toDoList) {
    document
      .getElementById("toDoListConsole")
      .appendChild(generateEditTitle(toDoList));
    document
      .getElementById("toDoListConsole")
      .appendChild(
        generateEditDesc(toDoList, changeDesc.bind(null, toDoList.id))
      );
  }
};

const generateEditDesc = function(list, onclickFunc) {
  const editDescDiv = document.createElement("div");

  const descBox = document.createElement("input");
  descBox.type = "text";
  descBox.value = list.desc;
  descBox.id = "editDesc";

  const descButton = document.createElement("button");
  descButton.onclick = onclickFunc;
  descButton.innerText = "submit";

  editDescDiv.appendChild(descBox);
  editDescDiv.appendChild(descButton);
  return editDescDiv;
};

const loadItemEditConsole = function(toDoListId, itemId) {
  document.getElementById("toDoListConsole").innerHTML = "";
  document
    .getElementById("toDoListConsole")
    .appendChild(
      generateEditDesc(
        { id: itemId, desc: "new desc here" },
        editItem.bind(null, toDoListId, { id: itemId, desc: "new desc here" })
      )
    );
};
const generateEditTitle = function(toDoList) {
  const editTitleDiv = document.createElement("div");

  const titleBox = document.createElement("input");
  titleBox.type = "text";
  titleBox.value = toDoList.title;
  titleBox.id = "editTitle";

  const titleButton = document.createElement("button");
  titleButton.innerText = "Submit";
  titleButton.onclick = changeTitle.bind(null, toDoList.id);

  editTitleDiv.appendChild(titleBox);
  editTitleDiv.appendChild(titleButton);
  return editTitleDiv;
};

const generateTitle = function(title) {
  const titleDiv = document.createElement("span");
  titleDiv.innerText = title;
  return titleDiv;
};

const generateItem = function(item, listId) {
  const itemDiv = document.createElement("div");
  const itemDesc = document.createElement("div");
  itemDesc.appendChild = generateTitle(item.desc);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onclick = toggleItemStatus.bind(null, listId, item.id);
  checkBox.checked = item.isDone;

  const editItemButton = document.createElement("button");
  editItemButton.onclick = loadItemEditConsole.bind(listId, item);
  editItemButton.innerText = "\u270E";

  const deleteItemButton = document.createElement("button");
  deleteItemButton.onclick = deleteItem.bind(null, listId, item.id);
  deleteItemButton.innerText = "\uD83D\uDDD1";

  itemDiv.appendChild(checkBox);
  itemDiv.appendChild(editItemButton);
  itemDiv.appendChild(itemDesc);
  itemDiv.appendChild(deleteItemButton);

  return itemDiv;
};

const getCheckStatus = bool => {
  if (bool) {
    return "checked";
  }
  return "";
};

const generateItems = function(items, listId) {
  const itemsDiv = document.createElement("div");
  Object.keys(items).forEach(itemKey => {
    itemsDiv.appendChild(generateItem(items[itemKey], listId));
  });
  return itemsDiv;
};

const loadConsole = function(toDoList) {
  const console = document.getElementById("toDoListConsole");
  console.innerHTML = "";
  if (toDoList) {
    const addItemConsole = generateAddItemDiv(toDoList.id);
    // toDoList.desc +
    // addItemConsole +
    // generateItems(toDoList.items, toDoList.id);
    const desc = document.createElement("span");
    desc.innerText = toDoList.desc;

    console.appendChild(desc);
    console.appendChild(addItemConsole);
    console.appendChild(generateItems(toDoList.items, toDoList.id));
  }
};

const generateAddItemDiv = function(listId) {
  const addItemDiv = document.createElement("div");

  const descBox = document.createElement("textarea");
  descBox.id = listId + "item";
  descBox.type = "text";
  descBox.name = "item";
  descBox.placeholder = "description";

  const addButton = document.createElement("button");
  addButton.onclick = addToDoItem.bind(null, listId);
  addButton.innerText = "Add +";

  addItemDiv.appendChild(descBox);
  addItemDiv.appendChild(addButton);
  return addItemDiv;
  // return `<div>
  //   <textarea
  //     name="item"
  //     id="${listId}item"
  //     type="text"
  //     placeholder="description"
  //   ></textarea>
  //   <button onclick="addToDoItem(${listId})">Add +</button>
  // </div>`;
};

window.onload = loadToDoLists;
