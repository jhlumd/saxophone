const Selectable = require("./selectable");
const SelectablesList = require("./selectables_list");

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

module.exports = TabAccordionComponent;