const ToDo = require("./toDo");
const { deleteProperty, addProperty } = require("./util/objectMethods.js");

class User {
  constructor(details) {
    this.username = details.username;
    this.password = details.password;
    this.firstName = details.firstName;
    this.lastName = details.lastName;
    this.toDos = {};
    Object.keys(details.toDos).reduce(function(toDo, toDoKey) {
      toDo[toDoKey] = new ToDo(details.toDos[toDoKey]);
      return toDo;
    }, this.toDos);
  }
  getFirstName() {
    return this.firstName;
  }
  isValidPassword(password) {
    return this.password == password;
  }
  deleteToDo(toDoId) {
    deleteProperty(this.toDos, toDoId);
  }
  addToDoList(toDo) {
    const toDoId = this.getNextToDoListId();
    toDo.id = toDoId;
    toDo.items = {};
    addProperty(this.toDos, toDoId, new ToDo(toDo));
  }
  getNextToDoListId() {
    const toDosKey = Object.keys(this.toDos).sort((key1, key2) => key1 - key2);
    const nextId = +toDosKey[toDosKey.length - 1] + 1 || 0;
    return nextId;
  }
}

module.exports = User;
