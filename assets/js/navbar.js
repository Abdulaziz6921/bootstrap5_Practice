const user = JSON.parse(localStorage.getItem("user"));
const signUpBtn = document.querySelector("#signUpBtn");
const nameDisplay = document.querySelector("#userName");

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
  logoutBtn.className = "btn  btn-danger position-absolute d-none";
  logoutBtn.style.top = "100%";
  logoutBtn.style.left = "0";

  // Append it inside userName span (which has position-relative class)
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
    window.location.reload(); // or redirect to login
  });
}
