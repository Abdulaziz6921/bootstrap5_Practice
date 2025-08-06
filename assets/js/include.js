document.querySelectorAll("[data-include]").forEach(async (el) => {
  const file = el.getAttribute("data-include");
  const response = await fetch(file);
  const html = await response.text();
  el.innerHTML = html;

  // ✅ Trigger custom event for other scripts like search.js
  el.dispatchEvent(new CustomEvent("include:loaded", { bubbles: true }));

  const currentPage = window.location.pathname;

  // ✅ Conditional logic for hiding signup button on auth pages
  if (
    currentPage.includes("signup.html") ||
    currentPage.includes("login.html")
  ) {
    const signupBtn = el.querySelector(".btn.btn-light");
    if (signupBtn) signupBtn.remove();
  }

  // ✅ If the included file is navbar.html, load navbar.js dynamically
  if (file.includes("navbar.html")) {
    const script = document.createElement("script");
    script.src = "assets/js/navbar.js";
    script.defer = true;
    document.head.appendChild(script);
  }
});
