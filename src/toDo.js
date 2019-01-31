const { deleteProperty, addProperty } = require("./util/objectMethods.js");
const Item = require("./item.js");

class ToDo {
  constructor(toDo) {
    this.id = toDo.id;
    this.title = toDo.title;
    this.desc = toDo.desc;
    this.items = {};
    Object.keys(toDo.items).reduce(function(items, itemKey) {
      items[itemKey] = new Item(toDo.items[itemKey]);
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
  addItem(item) {
    const itemId = this.getNextItemId();
    item.id = itemId;
    item.isDone = false;
    addProperty(this.items, itemId, new Item(item));
  }
  getNextItemId() {
    const itemsKey = Object.keys(this.items).sort((key1, key2) => key1 - key2);
    return +itemsKey[itemsKey.length - 1] + 1 || 0;
  }
}

module.exports = ToDo;
