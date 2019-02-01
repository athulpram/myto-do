const PENCIL = "\u270E";
const WASTEBIN = "\uD83D\uDDD1";
const ADD = "\u2795";

const getToDoLists = function(document, toDoListDiv, myToDo) {
  Object.keys(myToDo).map(toDoListKey => {
    let toDoDiv = document.createElement("div");
    toDoDiv.id = toDoListKey;
    const editConsole = loadEditConsole.bind(
      null,
      document,
      myToDo[toDoListKey]
    );
    const deleteToDo = deleteToDoList.bind(
      null,
      document,
      myToDo[toDoListKey].id
    );
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
    toDoHeading.onclick = loadConsole.bind(null, document, myToDo[toDoListKey]);

    appendChildren(toDoDiv, toDoHeading, editButton, deleteButton);
    toDoDiv.className = "toDoListNav";
    toDoListDiv.appendChild(toDoDiv);
  });
  loadConsole(document, myToDo[Object.keys(myToDo)[0]]);
};

const loadEditConsole = function(document, toDoList) {
  const toDoListConsole = getElement(document, "toDoListConsole");
  toDoListConsole.innerHTML = "";

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
    toDoListConsole.appendChild(toDoListFieldset);
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
  const toDoListConsole = getElement(document, "toDoListConsole");
  const editItemDesc = editItem.bind(null, document, toDoListId, item);
  const generateEditDescView = generateEditDescDiv(
    document,
    item,
    editItemDesc
  );
  toDoListConsole.innerHTML = "";
  toDoListConsole.appendChild(generateEditDescView);
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

const loadConsole = function(document, toDoList) {
  const consoleDiv = getElement(document, "toDoListConsole");
  consoleDiv.innerHTML = "";
  if (toDoList) {
    const addItemConsole = generateAddItemDiv(document, toDoList.id);

    const title = document.createElement("h2");
    title.className = "toDoListTitle";
    title.innerText = toDoList.title;

    const desc = document.createElement("span");
    desc.className = "toDoListDesc";
    desc.innerText = toDoList.desc;

    const itemsView = generateItemsDiv(document, toDoList.items, toDoList.id);
    appendChildren(consoleDiv, title, desc, addItemConsole, itemsView);
  }
};

const generateAddItemDiv = function(document, listId) {
  const addItemView = createFieldSet(document, "Add New Item");

  const descBox = createTextArea(document, "text", "item", "description");
  descBox.id = listId + "item";

  const descLabel = createLabel(document, "Description : ");
  const addButton = createButton(
    document,
    ADD,
    addToDoItem.bind(null, document, listId)
  );

  appendChildren(addItemView, descLabel, descBox, addButton);
  return addItemView;
};

window.onload = () => {
  loadToDoLists(document);
  getElement(document, "addToDoBtn").onclick = createToDoList.bind(
    null,
    document
  );
};
