const TabAccordionComponent = require("./tab_accordion");

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