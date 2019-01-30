const PENCIL = "\u270E";
const WASTEBIN = "\uD83D\uDDD1";
const ADD = "\u2795";
const getToDoLists = function(toDoListDiv, myToDo) {
  Object.keys(myToDo).map(toDoListKey => {
    let toDoDiv = document.createElement("div");
    toDoDiv.id = toDoListKey;
    const editConsole = loadEditConsole.bind(null, myToDo[toDoListKey]);
    const deleteToDo = deleteToDoList.bind(null, myToDo[toDoListKey].id);
    const editButton = createButton(
      document,
      PENCIL,
      editConsole,
      "iconButton"
    );

    const deleteButton = createButton(
      document,
      WASTEBIN,
      deleteToDo,
      "iconButton"
    );

    const toDoHeading = document.createElement("div");
    toDoHeading.innerText = myToDo[toDoListKey].title;
    toDoHeading.className = "toDoHeading";
    toDoHeading.onclick = loadConsole.bind(null, myToDo[toDoListKey]);

    appendChildren(toDoDiv, toDoHeading, editButton, deleteButton);
    toDoDiv.className = "toDoListNav";
    toDoListDiv.appendChild(toDoDiv);
  });
  loadConsole(myToDo[Object.keys(myToDo)[0]]);
};

const loadEditConsole = function(toDoList) {
  const toDoListConsole = document.getElementById("toDoListConsole");
  toDoListConsole.innerHTML = "";
  if (toDoList) {
    const changeDescView = changeDesc.bind(null, toDoList.id);
    const generateEditDescView = generateEditDesc(toDoList, changeDescView);
    toDoListConsole.appendChild(generateEditTitle(toDoList));
    toDoListConsole.appendChild(generateEditDescView);
  }
};

const generateEditDesc = function(list, onclickFunc) {
  const editDescDiv = document.createElement("div");
  const descBox = createTextBox(document, list.desc, "description");
  descBox.id = "editDesc";
  const descButton = createButton(document, "submit", onclickFunc);
  appendChildren(editDescDiv, descBox, descButton);
  return editDescDiv;
};

const loadItemEditConsole = function(toDoListId, item) {
  const toDoListConsole = document.getElementById("toDoListConsole");
  const editItemView = editItem.bind(null, toDoListId, item);
  const generateEditDescView = generateEditDesc(item, editItemView);
  toDoListConsole.innerHTML = "";
  toDoListConsole.appendChild(generateEditDescView);
};

const generateEditTitle = function(toDoList) {
  const editTitleView = document.createElement("fieldSet");
  const legend = document.createElement("legend");
  legend.innerText = "Edit Todo List";
  const titleLabel = createLabel(document, "Title : ");
  const titleBox = createTextBox(document, toDoList.title, "title", "editBox");
  titleBox.id = "editTitle";
  const titleButton = createButton(
    document,
    "Submit",
    changeTitle.bind(null, toDoList.id),
    "editBoxButton"
  );
  appendChildren(editTitleView, legend, titleLabel, titleBox, titleButton);
  return editTitleView;
};

const generateTitle = function(title) {
  const titleDiv = document.createElement("span");
  titleDiv.innerText = title;
  return titleDiv;
};

const generateItem = function(item, listId) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "itemDiv";
  const itemDesc = generateTitle(item.desc);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onclick = toggleItemStatus.bind(null, listId, item.id);
  checkBox.checked = item.isDone;
  const loadEditConsole = loadItemEditConsole.bind(null, listId, item);
  const editItemButton = createButton(
    document,
    PENCIL,
    loadEditConsole,
    "iconButton"
  );
  const deleteCurrItem = deleteItem.bind(null, listId, item.id);
  const deleteItemButton = createButton(
    document,
    WASTEBIN,
    deleteCurrItem,
    "iconButton"
  );

  appendChildren(itemDiv, checkBox, itemDesc, editItemButton, deleteItemButton);

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
  itemsDiv.className = "itemsDiv";
  Object.keys(items).forEach(itemKey => {
    itemsDiv.appendChild(generateItem(items[itemKey], listId));
  });
  return itemsDiv;
};

const loadConsole = function(toDoList) {
  const consoleDiv = document.getElementById("toDoListConsole");
  consoleDiv.innerHTML = "";
  if (toDoList) {
    const addItemConsole = generateAddItemDiv(toDoList.id);

    const title = document.createElement("h2");
    title.className = "toDoListTitle";
    title.innerText = toDoList.title;

    const desc = document.createElement("span");
    desc.className = "toDoListDesc";
    desc.innerText = toDoList.desc;

    appendChildren(
      consoleDiv,
      title,
      desc,
      addItemConsole,
      generateItems(toDoList.items, toDoList.id)
    );
  }
};

const generateAddItemDiv = function(listId) {
  const addItemView = document.createElement("fieldset");

  const addItemLegend = document.createElement("legend");
  addItemLegend.innerText = "Add New Item";
  addItemView.appendChild(addItemLegend);

  const descBox = document.createElement("textarea");
  descBox.id = listId + "item";
  descBox.type = "text";
  descBox.name = "item";
  descBox.placeholder = "description";

  const descLabel = document.createElement("label");
  descLabel.innerText = "Description : ";
  const addButton = createButton(document, ADD, addToDoItem.bind(null, listId));
  appendChildren(addItemView, descLabel, descBox, addButton);
  return addItemView;
};

window.onload = loadToDoLists;
