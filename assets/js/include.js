document.querySelectorAll("[data-include]").forEach(async (el) => {
  const file = el.getAttribute("data-include");
  const response = await fetch(file);
  const html = await response.text();
  el.innerHTML = html;

  // ✅ Trigger custom event for other scripts like search.js
  el.dispatchEvent(new CustomEvent("include:loaded", { bubbles: true }));

  // ✅ Conditional logic for hiding signup button on auth pages
  const currentPage = window.location.pathname;

  if (
    currentPage.includes("signup.html") ||
    currentPage.includes("login.html")
  ) {
    const signupBtn = el.querySelector(".btn.btn-light");
    if (signupBtn) signupBtn.remove();
  }
});
