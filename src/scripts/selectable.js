class Selectable {
  constructor(selectableElement) {
    this.element = selectableElement;
  }

  isActive() {
    return this.element.classList.contains("active");
  }

  activate() {
    this.element.classList.add("active");
  }

  deactivate() {
    this.element.classList.remove("active");
  }

  getButtonId() {
    return parseInt(this.element.dataset.buttonId);
  }
}

module.exports = Selectable;