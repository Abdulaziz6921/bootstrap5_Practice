import { auth } from "../features/firebase.js";
import { showPageLoader, hidePageLoader } from "../components/loader.js";
import { router } from "./router.js";
import { initSearch } from "../features/search.js";

function loadPage() {
  router();

  requestAnimationFrame(() => {
    import("../features/animations.js").then(({ initAnimations }) => {
      initAnimations();
    });

    if (document.querySelector('input[type="search"]')) {
      initSearch();
    }
  });
}

// ✅ Start loader immediately
window.addEventListener("load", () => {
  showPageLoader();

  import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js")
    .then(({ onAuthStateChanged }) => {
      let firstRun = true;

      onAuthStateChanged(auth, () => {
        if (firstRun) {
          loadPage();
          hidePageLoader();
          firstRun = false; // prevent rerunning loadPage
        }
      });
    })
    .catch((err) => {
      console.error("Auth init failed:", err);
      loadPage();
      hidePageLoader();
    });
});

// ✅ Handle route changes normally
window.addEventListener("hashchange", loadPage);
