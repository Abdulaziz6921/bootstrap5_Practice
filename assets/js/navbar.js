export function initNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const signUpBtn = document.querySelector("#signUpBtn");
  const nameDisplay = document.querySelector("#userName");

  // 🔹 Hide signup button on signup/login pages
  function updateSignupButtonVisibility() {
    const route = location.hash.slice(1).toLowerCase();
    if (route === "/signup" || route === "/login") {
      if (signUpBtn) signUpBtn.style.display = "none";
    } else {
      if (signUpBtn && !user) signUpBtn.style.display = ""; // show only if not logged in
    }
  }

  // 🔹 Call this whenever the route changes
  window.addEventListener("hashchange", updateSignupButtonVisibility);
  updateSignupButtonVisibility();

  if (user && user.name && nameDisplay) {
    if (signUpBtn) {
      signUpBtn.remove();
    }

    // Set name
    nameDisplay.textContent = user.name;
    nameDisplay.classList.toggle("d-none");

    // Create logout button
    const logoutBtn = document.createElement("button");
    logoutBtn.id = "logoutBtn";
    logoutBtn.textContent = "Log out";
    logoutBtn.className = "btn btn-danger position-absolute d-none";
    logoutBtn.style.top = "100%";
    logoutBtn.style.left = "0";

    nameDisplay.classList.add("position-relative");
    nameDisplay.appendChild(logoutBtn);

    // Show/hide on hover
    nameDisplay.addEventListener("mouseenter", () => {
      logoutBtn.classList.remove("d-none");
    });
    nameDisplay.addEventListener("mouseleave", () => {
      logoutBtn.classList.add("d-none");
    });

    // Handle logout
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.reload();
    });
  }
}
