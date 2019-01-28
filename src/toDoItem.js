class ToDoItem {
  constructor(toDoItem) {
    this.id = toDoItem.id;
    this.desc = toDoItem.desc;
    this.isDone = toDoItem.isDone;
  }
  toggleDone() {
    this.isDone = !this.isDone;
  }
  changeDesc(desc) {
    this.desc = desc;
  }
  getId() {
    return this.id;
  }
}

module.exports = ToDoItem;
