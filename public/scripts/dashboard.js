const PENCIL = "\u270E";
const WASTEBIN = "\uD83D\uDDD1";
const ADD = "\u2795";
const EDIT_CLASS = "fas fa-edit";
const TRASH_CLASS = "fas fa-trash-alt";
const ADD_ITEM_CLASS = "fas fa-plus add-item";

const openOverlay = id => {
  getElement(document, id).style.visibility = "visible";
};
const closeOverlay = id => {
  getElement(document, id).style.visibility = "hidden";
};

const openAddItemDiv = function() {
  openOverlay("addItemOverlay");
};

const closeAddItemDiv = function() {
  closeOverlay("addItemOverlay");
  getElement(document, "itemSummary").value = "";
};

const createButtons = function(editFunction, deleteFunction) {
  const editButton = createIconBtn(document, EDIT_CLASS, editFunction);
  const deleteButton = createIconBtn(document, TRASH_CLASS, deleteFunction);
  const buttons = createElement(document, "div");
  buttons.className = "buttons";
  appendChildren(buttons, editButton, deleteButton);
  return buttons;
};

const getToDoLists = function(document, toDoListDiv, userToDos) {
  Object.keys(userToDos).map(toDoListKey => {
    const currToDo = userToDos[toDoListKey];
    const toDoDiv = createElement(document, "div");
    toDoDiv.id = toDoListKey;

    const editConsole = loadEditConsole.bind(null, document, currToDo);
    const deleteToDo = deleteToDoList.bind(null, document, currToDo.id);

    const toDoHeading = createElement(document, "div");
    toDoHeading.innerText = currToDo.title;
    toDoHeading.className = "toDoHeading";
    toDoHeading.onclick = loadConsole.bind(null, document, currToDo);

    const buttons = createButtons(editConsole, deleteToDo);
    appendChildren(toDoDiv, toDoHeading, buttons);
    toDoDiv.className = "toDoListNav";
    toDoListDiv.appendChild(toDoDiv);
  });
  loadConsole(document, userToDos[Object.keys(userToDos)[0]]);
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
  const editDescDiv = createElement(document, "div");
  const descBox = createTextBox(document, list.desc, "description");
  descBox.id = "editDesc";
  const descButton = createButton(document, "submit", onclickFunc);
  appendChildren(editDescDiv, descBox, descButton);
  return editDescDiv;
};

const loadItemEditView = function(document, toDoListId, item) {
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
  const editTitleView = createElement(document, "span");
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
  const titleDiv = createElement(document, "span");
  titleDiv.innerText = title;
  return titleDiv;
};

const generateItemDiv = function(document, item, listId) {
  const itemDiv = createElement(document, "div");
  itemDiv.className = "itemDiv";
  const itemDesc = generateTitleDiv(document, item.desc);

  const checkBox = createElement(document, "input");
  checkBox.type = "checkbox";
  checkBox.onclick = toggleItemStatus.bind(null, document, listId, item.id);
  checkBox.checked = item.isDone;

  const checkBoxAndSummary = createElement(document, "div");
  checkBoxAndSummary.className = "checkbox-summary";
  appendChildren(checkBoxAndSummary, checkBox, itemDesc);

  const loadEditConsole = loadItemEditView.bind(null, document, listId, item);

  const deleteCurrItem = deleteItem.bind(null, document, listId, item.id);

  const buttonDiv = createButtons(loadEditConsole, deleteCurrItem);
  appendChildren(itemDiv, checkBoxAndSummary, buttonDiv);

  return itemDiv;
};

const generateItemsDiv = function(document, items, listId) {
  const itemsDiv = createElement(document, "div");
  itemsDiv.className = "itemsDiv";
  Object.keys(items).forEach(itemKey => {
    itemsDiv.appendChild(generateItemDiv(document, items[itemKey], listId));
  });
  return itemsDiv;
};

const generateHeader = function(document, toDo) {
  const toDoHeading = createElement(document, "span");
  toDoHeading.innerText = `Title : ${toDo.title}`;

  const title = createElement(document, "span");
  title.className = "toDoListTitle";
  title.innerText = toDo.title;

  const addItemBtn = createIconBtn(document, ADD_ITEM_CLASS, openAddItemDiv);

  const addItemBtnDiv = createElement(document, "div");
  addItemBtnDiv.appendChild(addItemBtn);

  const headerDiv = createElement(document, "div");
  headerDiv.id = "toDoHeader";
  appendChildren(headerDiv, toDoHeading, addItemBtnDiv);

  return headerDiv;
};

const loadConsole = function(document, toDoList) {
  const consoleHeader = getElement(document, "consoleHeader");
  consoleHeader.innerHTML = "";
  consoleHeader.appendChild(generateHeader(document, toDoList));

  getElement(document, "addToDoItemBtn").onclick = () => {
    addToDoItem(document, toDoList.id);
    closeAddItemDiv(document);
  };
  const consoleDiv = getElement(document, "consoleArea");
  const consoleSubHeading = getElement(document, "secondHeader");
  if (toDoList) {
    consoleDiv.innerHTML = "";
    consoleSubHeading.innerHTML = "";
    const desc = createElement(document, "span");
    desc.className = "toDoListDesc";
    desc.innerText = `Description: ${toDoList.desc}`;

    const itemsView = generateItemsDiv(document, toDoList.items, toDoList.id);
    appendChildren(consoleSubHeading, desc);
    appendChildren(consoleDiv, itemsView);
  }
};

window.onload = () => {
  loadToDoLists(document);
  getElement(document, "addToDoBtn").onclick = () => {
    createToDoList(document);
    closeOverlay("addToDoOverlay");
  };
};
