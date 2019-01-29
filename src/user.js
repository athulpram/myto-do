const ToDoList = require("./toDoList");
const { deleteProperty, addProperty } = require("./util/objectMethods.js");

class User {
  constructor(userDetails) {
    this.username = userDetails.username;
    this.password = userDetails.password;
    this.firstName = userDetails.firstName;
    this.lastName = userDetails.lastName;
    this.toDoLists = {};
    Object.keys(userDetails.toDoLists).reduce(function(lists, toDoListKey) {
      lists[toDoListKey] = new ToDoList(userDetails.toDoLists[toDoListKey]);
      return lists;
    }, this.toDoLists);
  }
  getFirstName() {
    return this.firstName;
  }
  isValidPassword(password) {
    return this.password == password;
  }
  deleteToDoList(toDoId) {
    deleteProperty(this.toDoLists, toDoId);
  }
  addToDoList(toDoList) {
    let toDoListId = this.getNextToDoListId();
    toDoList.id = toDoListId;
    toDoList.items = {};
    addProperty(this.toDoLists, toDoListId, new ToDoList(toDoList));
  }
  getNextToDoListId() {
    const toDoListsKey = Object.keys(this.toDoLists).sort();
    return +toDoListsKey[toDoListsKey.length - 1] + 1 || 0;
  }
}

module.exports = User;
