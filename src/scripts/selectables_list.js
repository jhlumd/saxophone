const Selectable = require("./selectable");

class SelectablesList {
  constructor(nodeList) {
    this.nodeList = nodeList;
    this.list = this.initList();
  }

  initList() {
    const selectablesArray = [];

    for (let i = 0; i < this.nodeList.length; i++) {
      const item = new Selectable(this.nodeList[i]);
      selectablesArray.push(item);
    }

    return selectablesArray;
  }

  activateIdx(buttonId) {
    this.list[buttonId].activate();
  }

  deactivateIdx(buttonId) {
    this.list[buttonId].deactivate();
  }

  deactivateAll() {
    this.list.forEach((selectable) => selectable.deactivate());
  }

  areAllInactive() {
    for (let i = 0; i < this.list.length; i++) {
      const selectable = this.list[i];
      if (selectable.isActive()) return false;
    }
    return true;
  }
}

module.exports = SelectablesList;