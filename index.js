// Tab buttons (large screen):
const tabButtons = document.querySelectorAll(".tab-button");
tabButtons.forEach((tab) => tab.addEventListener("click", onTabClick));

// Accordion buttons (small screen):
const accButtons = document.querySelectorAll(".accordion-button");
accButtons.forEach((button) => button.addEventListener("click", onAccClick));

// NodeList of contents for the 2 functions below to close over
const contents = document.querySelectorAll(".content");

function onTabClick(e) {
  const clickedTab = e.target;
  if (clickedTab.classList.contains("active")) return;

  const prevTab = document.querySelector(".tabs").querySelector(".active");
  if (prevTab) {
    // Deactivate previous tab
    prevTab.classList.remove("active");

    // Deactiveate previous content section
    const prevTabNum = parseInt(prevTab.dataset.tabNumber);
    const prevContent = contents[prevTabNum];
    prevContent.classList.remove("active");

    // Also update invisible accordion button to keep in sync
    const prevAccButton = accButtons[prevTabNum];
    prevAccButton.classList.remove("active");
  }

  // Activate newly clicked tab
  clickedTab.classList.add("active");

  // Activate clicked content
  const clickedTabNum = parseInt(clickedTab.dataset.tabNumber);
  const clickedContent = contents[clickedTabNum];
  clickedContent.classList.add("active");

  // Also update invisible accordion button to keep in sync
  const clickedAccButton = accButtons[clickedTabNum];
  clickedAccButton.classList.add("active");
}

function onAccClick(e) {
  const clickedAcc = e.target;
  if (clickedAcc.classList.contains("active")) {
    // Deactivate the open accordion (all are collapsed in small screen but
    // large screen view keeps last opened tab)
    clickedAcc.classList.remove("active");
    const prevAccNum = parseInt(clickedAcc.dataset.accNumber);
    const prevContent = contents[prevAccNum];
    prevContent.classList.remove("active");
    prevContent.style.maxHeight = null;
  } else {
    const prevAcc = document.querySelector(".accordion-button.active");
    if (prevAcc) {
      //Deactivate previous accordion
      prevAcc.classList.remove("active");

      // Deactivate previous content section
      const prevAccNum = parseInt(prevAcc.dataset.accNumber);
      const prevContent = contents[prevAccNum];
      prevContent.classList.remove("active");
      prevContent.style.maxHeight = null;

      // Also update large screen tab to keep in sync
      const prevTabButton = tabButtons[prevAccNum];
      prevTabButton.classList.remove("active");
    }

    // Activate newly clicked accordion
    clickedAcc.classList.add("active");

    // Activate clicked content
    const clickedAccNum = parseInt(clickedAcc.dataset.accNumber);
    const clickedContent = contents[clickedAccNum];
    clickedContent.classList.add("active");
    // padding top and bottom = 28px
    clickedContent.style.maxHeight = `${clickedContent.scrollHeight + 28}px`;

    //Also update large screen tab to keep in sync
    const clickedTabButton = tabButtons[clickedAccNum];
    clickedTabButton.classList.add("active");
  }
}
