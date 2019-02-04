const PENCIL = "\u270E";
const WASTEBIN = "\uD83D\uDDD1";
const ADD = "\u2795";

const openAddItem = () => {
  document.getElementById("addToDoOverlay").style.visibility = "visible";
};
const closeAddItem = () => {
  document.getElementById("addToDoOverlay").style.visibility = "hidden";
};

const getToDoLists = function(document, toDoListDiv, myToDo) {
  Object.keys(myToDo).map(toDoListKey => {
    let toDoDiv = document.createElement("div");
    toDoDiv.id = toDoListKey;
    const editConsole = loadEditConsole.bind(
      null,
      document,
      myToDo[toDoListKey]
    );
    const editButton = document.createElement("i");
    editButton.className = "fas fa-edit";
    editButton.onclick = editConsole;

    const deleteToDo = deleteToDoList.bind(
      null,
      document,
      myToDo[toDoListKey].id
    );

    const deleteButton = document.createElement("i");
    deleteButton.className = "fas fa-trash-alt";
    deleteButton.onclick = deleteToDo;

    const toDoHeading = document.createElement("div");
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    toDoHeading.innerText = myToDo[toDoListKey].title;
    toDoHeading.className = "toDoHeading";
    toDoHeading.onclick = loadConsole.bind(null, document, myToDo[toDoListKey]);

    appendChildren(buttons, editButton, deleteButton);
    appendChildren(toDoDiv, toDoHeading, buttons);
    toDoDiv.className = "toDoListNav";
    toDoListDiv.appendChild(toDoDiv);
  });
  loadConsole(document, myToDo[Object.keys(myToDo)[0]]);
};

const loadEditConsole = function(document, toDoList) {
  const consoleArea = getElement(document, "consoleArea");
  consoleArea.innerHTML = "";

  const toDoListFieldset = createFieldSet(document, "Edit To - Do");
  const descLabel = createLabel(document, "Description : ");

  if (toDoList) {
    const changeListDesc = changeDesc.bind(null, document, toDoList.id);
    const editDescView = generateEditDescDiv(
      document,
      toDoList,
      changeListDesc
    );
    const editTitleView = generateEditTitleDiv(document, toDoList);

    appendChildren(toDoListFieldset, editTitleView, descLabel, editDescView);
    consoleArea.appendChild(toDoListFieldset);
  }
};

const generateEditDescDiv = function(document, list, onclickFunc) {
  const editDescDiv = document.createElement("div");
  const descBox = createTextBox(document, list.desc, "description");
  descBox.id = "editDesc";
  const descButton = createButton(document, "submit", onclickFunc);
  appendChildren(editDescDiv, descBox, descButton);
  return editDescDiv;
};

const loadItemEditConsole = function(document, toDoListId, item) {
  const consoleArea = getElement(document, "consoleArea");
  const editItemDesc = editItem.bind(null, document, toDoListId, item);
  const generateEditDescView = generateEditDescDiv(
    document,
    item,
    editItemDesc
  );
  consoleArea.innerHTML = "";
  consoleArea.appendChild(generateEditDescView);
};

const generateEditTitleDiv = function(document, toDoList) {
  const editTitleView = document.createElement("span");
  const titleLabel = createLabel(document, "Title : ");
  const titleBox = createTextBox(document, toDoList.title, "title", "editBox");
  titleBox.id = "editTitle";
  const titleButton = createButton(
    document,
    "Submit",
    changeTitle.bind(null, document, toDoList.id),
    "editBoxButton"
  );
  appendChildren(editTitleView, titleLabel, titleBox, titleButton);
  return editTitleView;
};

const generateTitleDiv = function(document, title) {
  const titleDiv = document.createElement("span");
  titleDiv.innerText = title;
  return titleDiv;
};

const generateItemDiv = function(document, item, listId) {
  const itemDiv = document.createElement("div");
  itemDiv.className = "itemDiv";
  const itemDesc = generateTitleDiv(document, item.desc);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onclick = toggleItemStatus.bind(null, document, listId, item.id);
  checkBox.checked = item.isDone;
  const loadEditConsole = loadItemEditConsole.bind(
    null,
    document,
    listId,
    item
  );
  const editItemButton = createButton(
    document,
    PENCIL,
    loadEditConsole,
    "iconButton"
  );
  const deleteCurrItem = deleteItem.bind(null, document, listId, item.id);
  const deleteItemButton = createButton(
    document,
    WASTEBIN,
    deleteCurrItem,
    "iconButton"
  );

  appendChildren(itemDiv, checkBox, itemDesc, deleteItemButton, editItemButton);

  return itemDiv;
};

const generateItemsDiv = function(document, items, listId) {
  const itemsDiv = document.createElement("div");
  itemsDiv.className = "itemsDiv";
  Object.keys(items).forEach(itemKey => {
    itemsDiv.appendChild(generateItemDiv(document, items[itemKey], listId));
  });
  return itemsDiv;
};

const openAddItemDiv = function() {
  document.getElementById("addItemOverlay").style.visibility = "visible";
};

const closeAddItemDiv = function() {
  document.getElementById("addItemOverlay").style.visibility = "hidden";
  document.getElementById("itemSummary").value = "";
};

const generateHeader = function(document, toDo) {
  const toDoHeading = document.createElement("span");
  toDoHeading.innerText = `Title : ${toDo.title}`;

  const title = document.createElement("span");
  title.className = "toDoListTitle";
  title.innerText = toDo.title;

  const addItemBtn = document.createElement("i");
  addItemBtn.className = "fas fa-plus add-item";
  addItemBtn.onclick = openAddItemDiv;

  const addItemBtnDiv = document.createElement("div");
  addItemBtnDiv.appendChild(addItemBtn);

  const headerDiv = document.createElement("div");
  headerDiv.id = "toDoHeader";
  appendChildren(headerDiv, toDoHeading, addItemBtnDiv);

  return headerDiv;
};

const loadConsole = function(document, toDoList) {
  const consoleHeader = getElement(document, "consoleHeader");
  consoleHeader.innerHTML = "";
  consoleHeader.appendChild(generateHeader(document, toDoList));

  document.getElementById("addToDoItemBtn").onclick = () => {
    addToDoItem(document, toDoList.id);
    closeAddItemDiv(document);
  };
  const consoleDiv = getElement(document, "consoleArea");
  consoleDiv.innerHTML = "";
  if (toDoList) {
    const desc = document.createElement("span");
    desc.className = "toDoListDesc";
    desc.innerText = toDoList.desc;

    const itemsView = generateItemsDiv(document, toDoList.items, toDoList.id);
    appendChildren(consoleDiv, desc, itemsView);
  }
};

window.onload = () => {
  loadToDoLists(document);
  getElement(document, "addToDoBtn").onclick = () => {
    createToDoList(document);
    document.getElementById("addToDoOverlay").style.visibility = "hidden";
  };
};
