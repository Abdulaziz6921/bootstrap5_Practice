import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../features/firebase.js";
import { showInlineLoader, hideInlineLoader } from "../components/loader.js";
import { showModal } from "../components/modal.js";

export function initNavbar() {
  const signUpBtn = document.querySelector("#signUpBtn");
  const nameDisplay = document.querySelector("#userName");

  // Utility delay
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // 🔹 Render username or hide
  function renderUserName(displayName) {
    if (!nameDisplay) return;

    hideInlineLoader(nameDisplay);
    nameDisplay.textContent = displayName || "";
    if (displayName) {
      nameDisplay.classList.remove("d-none");
      nameDisplay.classList.add("position-relative");
    } else {
      nameDisplay.classList.add("d-none");
      nameDisplay.classList.remove("position-relative");
    }
  }

  // 🔹 Show/hide signup button
  function updateSignupButtonVisibility(user) {
    const route = location.hash.slice(1).toLowerCase();
    if (!signUpBtn) return;

    if (route === "/signup" || route === "/login") {
      signUpBtn.classList.add("d-none");
      return;
    }
    if (!user) {
      signUpBtn.classList.remove("d-none");
    } else {
      signUpBtn.classList.add("d-none");
    }
  }

  // ✅ Avoid flash
  updateSignupButtonVisibility(auth.currentUser);

  onAuthStateChanged(auth, async (user) => {
    updateSignupButtonVisibility(user);

    if (user) {
      // 🔹 Always show loader first
      if (nameDisplay) {
        showInlineLoader(nameDisplay, 30);
        nameDisplay.classList.remove("d-none");
      }

      try {
        // Always wait 2 seconds (even if cached)
        await delay(300);

        // Try cached name first
        let finalName = localStorage.getItem("displayName");

        // If nothing cached → get from Auth/Firestore
        if (!finalName) {
          finalName = user.displayName || null;

          if (!finalName) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.exists()
              ? docSnap.data()
              : { email: user.email };

            finalName = userData.name || user.email;
          }

          // Cache for next reload
          localStorage.setItem("displayName", finalName);
        }

        // Update UI
        renderUserName(finalName);

        // 🔹 Logout button logic
        let logoutBtn = nameDisplay.querySelector("#logoutBtn");
        if (!logoutBtn) {
          logoutBtn = document.createElement("button");
          logoutBtn.id = "logoutBtn";
          logoutBtn.textContent = "Log out";
          logoutBtn.className =
            "btn btn-danger position-absolute d-none top-100 start-50 translate-middle-x fs-6";
          logoutBtn.style.padding = "7px 14px";
          nameDisplay.appendChild(logoutBtn);
        }

        if (!nameDisplay.dataset.hoverBound) {
          nameDisplay.addEventListener("mouseenter", () => {
            logoutBtn.classList.remove("d-none");
          });
          nameDisplay.addEventListener("mouseleave", () => {
            logoutBtn.classList.add("d-none");
          });
          // nameDisplay.dataset.hoverBound = "1";
        }

        logoutBtn.onclick = async () => {
          try {
            let proceed = true;
            if (typeof showModal === "function") {
              proceed = await new Promise((resolve) =>
                showModal({
                  title: "Confirm Logout",
                  message: "Are you sure you want to log out?",
                  icon: {
                    className: "bi bi-box-arrow-right text-white",
                    ariaLabel: "Logout",
                  },
                  isDismissible: true,
                  primaryButton: {
                    text: "Yes, log me out",
                    className: "btn btn-danger",
                    action: () => resolve(true),
                  },
                  secondaryButton: {
                    text: "No, keep me in",
                    className: "btn btn-secondary text-white",
                    action: () => resolve(false),
                  },
                })
              );
            }
            if (!proceed) return;

            logoutBtn.disabled = true;
            logoutBtn.textContent = "Logging out...";
            await signOut(auth);

            localStorage.removeItem("displayName"); // ✅ clear cache
          } catch (err) {
            console.error("Logout failed", err);
            logoutBtn.disabled = false;
            logoutBtn.textContent = "Log out";
          }
        };
      } catch (err) {
        console.error("Failed to load user data", err);
        renderUserName(user.email);
        localStorage.setItem("displayName", user.email);
      }
    } else {
      // Logged out
      renderUserName(null);
      localStorage.removeItem("displayName");
      if (signUpBtn) {
        signUpBtn.style.display = "";
      }
    }
  });

  window.addEventListener("hashchange", () =>
    updateSignupButtonVisibility(auth.currentUser)
  );
}
