class Item {
  constructor(item) {
    this.id = item.id;
    this.desc = item.desc;
    this.isDone = item.isDone;
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

module.exports = Item;
