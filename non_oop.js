// Tab buttons (on large screen):
const tabButtons = document.querySelectorAll(".tab-button");
// Accordion buttons (on small screen):
const accButtons = document.querySelectorAll(".accordion-button");
// All 3 content sections
const contents = document.querySelectorAll(".content");

tabButtons.forEach((tab) => tab.addEventListener("click", onTabClick));
accButtons.forEach((acc) => acc.addEventListener("click", onAccClick));

function onTabClick(e) {
  const clickedTab = e.target;

  // Cannot deactivate all tabs when in large screen mode
  if (clickedTab.classList.contains("active")) return;

  const prevTab = document.querySelector(".tabs").querySelector(".active");
  if (prevTab) {
    // Deactivate previous tab
    prevTab.classList.remove("active");

    // Deactiveate previous content section
    const prevTabNum = parseInt(prevTab.dataset.buttonId);
    const prevContent = contents[prevTabNum];
    prevContent.classList.remove("active");

    // Also update invisible accordion button to keep in sync
    const prevAccButton = accButtons[prevTabNum];
    prevAccButton.classList.remove("active");
  }

  // Activate newly clicked tab
  clickedTab.classList.add("active");

  // Activate clicked content
  const clickedTabNum = parseInt(clickedTab.dataset.buttonId);
  const clickedContent = contents[clickedTabNum];
  clickedContent.classList.add("active");

  // Also update invisible accordion button to keep in sync
  const clickedAccButton = accButtons[clickedTabNum];
  clickedAccButton.classList.add("active");
}

function onAccClick(e) {
  const clickedAcc = e.target;
  if (clickedAcc.classList.contains("active")) {
    // Deactivate the open accordion
    clickedAcc.classList.remove("active");

    // Deactive content section
    const prevAccNum = parseInt(clickedAcc.dataset.buttonId);
    const prevContent = contents[prevAccNum];
    prevContent.classList.remove("active");

    // Also update the large screen tab to keep in sync
    const prevTabButton = tabButtons[prevAccNum];
    prevTabButton.classList.remove("active");
  } else {
    const prevAcc = document.querySelector(".accordion-button.active");
    if (prevAcc) {
      //Deactivate previous accordion
      prevAcc.classList.remove("active");

      // Deactivate previous content section
      const prevAccNum = parseInt(prevAcc.dataset.buttonId);
      const prevContent = contents[prevAccNum];
      prevContent.classList.remove("active");

      // Also update large screen tab to keep in sync
      const prevTabButton = tabButtons[prevAccNum];
      prevTabButton.classList.remove("active");
    }

    // Activate newly clicked accordion
    clickedAcc.classList.add("active");

    // Activate clicked content
    const clickedAccNum = parseInt(clickedAcc.dataset.buttonId);
    const clickedContent = contents[clickedAccNum];
    clickedContent.classList.add("active");

    //Also update large screen tab to keep in sync
    const clickedTabButton = tabButtons[clickedAccNum];
    clickedTabButton.classList.add("active");
  }
}

// handle screen resize
const breakpoint = 767;
let isLargeScreen = window.innerWidth > breakpoint;

function areAllInactive(nodeList) {
  for (let i = 0; i < nodeList.length; i++) {
    if (nodeList[i].classList.contains("active")) return false;
  }
  return true;
}

function handleResize() {
  if (!isLargeScreen && window.innerWidth > breakpoint) {
    isLargeScreen = true;
    if (areAllInactive(tabButtons)) {
      tabButtons[0].classList.add("active");
      accButtons[0].classList.add("active");
      contents[0].classList.add("active");
    }
  } else if (window.innerWidth <= breakpoint) {
    isLargeScreen = false;
  }
}

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

handleResize();
const dbcHandleResize = debounce(handleResize, 250);
window.addEventListener("resize", dbcHandleResize);
window.addEventListener("orientationchange", dbcHandleResize);
