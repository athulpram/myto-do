const { deleteProperty, addProperty } = require("./util/objectMethods.js");
const ToDoItem = require("./toDoItem.js");

class ToDoList {
  constructor(toDo) {
    this.id = toDo.id;
    this.title = toDo.title;
    this.desc = toDo.desc;
    this.items = {};
    Object.keys(toDo.items).reduce(function(items, toDoItemKey) {
      items[toDoItemKey] = new ToDoItem(toDo.items[toDoItemKey]);
      return items;
    }, this.items);
  }
  changeTitle(title) {
    this.title = title;
  }
  changeDesc(desc) {
    this.desc = desc;
  }
  deleteItem(itemId) {
    deleteProperty(this.items, itemId);
  }
  addItem(toDoItem) {
    const itemId = this.getNextItemId();
    toDoItem.id = itemId;
    toDoItem.isDone = false;
    addProperty(this.items, itemId, new ToDoItem(toDoItem));
  }
  getNextItemId() {
    const itemsKey = Object.keys(this.items).sort();
    return +itemsKey[itemsKey.length - 1] + 1;
  }
}

module.exports = ToDoList;