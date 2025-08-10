import { router } from "./router.js";
import { initSearch } from "./search.js";

function loadPage() {
  router();

  requestAnimationFrame(() => {
    // ✅ Initialize animations dynamically
    import("./animations.js").then(({ initAnimations }) => {
      initAnimations();
    });

    // ✅ Initialize search only if search element exists
    if (document.querySelector('input[type="search"]')) {
      initSearch();
    }
  });
}

window.addEventListener("hashchange", loadPage);
window.addEventListener("load", loadPage);
