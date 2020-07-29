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

class TabAccordionComponent {
  constructor(breakpoint) {
    this.tabButtons = document.querySelectorAll(".tab-button");
    this.accButtons = document.querySelectorAll(".accordion-button");
    this.contents = document.querySelectorAll(".content");

    this.selectablesCollection = [
      new SelectablesList(this.tabButtons),
      new SelectablesList(this.accButtons),
      new SelectablesList(this.contents),
    ];

    this.breakpoint = breakpoint;
    this.isLargeScreen = window.innerWidth > this.breakpoint;

    this.handleTabClick = this.handleTabClick.bind(this);
    this.handleAccordionClick = this.handleAccordionClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  initComponent() {
    this.tabButtons.forEach((tab) =>
      tab.addEventListener("click", this.handleTabClick)
    );
    this.accButtons.forEach((acc) =>
      acc.addEventListener("click", this.handleAccordionClick)
    );
  }

  changeMode(buttonId) {
    this.deactivateAll();
    this.activateIdx(buttonId);
  }

  deactivateAll() {
    this.selectablesCollection.forEach((list) => list.deactivateAll());
  }

  activateIdx(buttonId) {
    this.selectablesCollection.forEach((list) => list.activateIdx(buttonId));
  }

  handleTabClick(e) {
    const clickedTab = new Selectable(e.target);

    // Do nothing if the clicked tab is already active (large screen).
    if (clickedTab.isActive()) return;

    this.changeMode(clickedTab.getButtonId());
  }

  handleAccordionClick(e) {
    const clickedAccordion = new Selectable(e.target);

    if (clickedAccordion.isActive()) {
      // Close all accordions if currently active one is clicked (small screen).
      this.deactivateAll();
    } else {
      this.changeMode(clickedAccordion.getButtonId());
    }
  }

  handleResize() {
    if (!this.isLargeScreen && window.innerWidth > this.breakpoint) {
      this.isLargeScreen = true;

      // If all accordions were closed when  moving back to large screen mode,
      // open the first tab by default.
      if (this.selectablesCollection[0].areAllInactive()) this.activateIdx(0);
    } else if (window.innerWidth <= this.breakpoint) {
      this.isLargeScreen = false;
    }
  }
}


// debounce function for window resize handling
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

let app;

function start() {
  app = new TabAccordionComponent(767);
  app.initComponent();
  app.handleResize();
  const dbcHandleResize = debounce(app.handleResize, 250);
  window.addEventListener("resize", dbcHandleResize);
  window.addEventListener("orientationchange", dbcHandleResize);
}

start();
