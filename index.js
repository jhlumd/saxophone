// Handle screen resize and orientation changes:

const breakpoint = 767;
let isSmallScreen = false;

function handleResize() {
  if (window.innerWidth <= breakpoint && !isSmallScreen) {
    isSmallScreen = true;
  } else if (window.innerWidth > breakpoint) {
    isSmallScreen = false;
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
const debouncedHandleResize = debounce(handleResize, 250);
window.addEventListener("resize", debouncedHandleResize);
window.addEventListener("orientationchange", debouncedHandleResize);


// For large screens:
const tabButtons = document.querySelectorAll(".tab-button");
tabButtons.forEach((tab) => tab.addEventListener("click", onTabClick));

function onTabClick(e) {
  const clickedTab = e.target;
  if (clickedTab.classList.contains("active")) return;

  // Handle top tabs menu
  const prevTab = document.querySelector(".tabs").querySelector(".active");
  if (prevTab) prevTab.classList.remove("active");
  clickedTab.classList.add("active");

  // Handle bottom section content
  const contents = document.querySelectorAll(".content");
  if (prevTab) {
    const prevTabNum = parseInt(prevTab.dataset.tabNumber);
    const prevContent = contents[prevTabNum - 1];
    prevContent.classList.remove("active");
  }
  const clickedTabNum = parseInt(clickedTab.dataset.tabNumber);
  const clickedContent = contents[clickedTabNum - 1];
  clickedContent.classList.add("active");
}
