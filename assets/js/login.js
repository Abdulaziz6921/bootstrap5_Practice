document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    // Check if user exists with matching credentials
    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() === enteredEmail.toLowerCase() &&
        user.password === enteredPassword
    );

    if (existingUser) {
      // Store logged-in user info in localStorage
      localStorage.setItem("user", JSON.stringify(existingUser));

      // Redirect to homepage
      window.location.href = "index.html";
    } else {
      alert("Incorrect email or password.");
    }
  });
});
