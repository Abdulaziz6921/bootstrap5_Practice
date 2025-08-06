document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signUpForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const termsCheckbox = document.getElementById("terms");
  const errorMsg = document.querySelector("#signupErrorMsg");

  // Toggle password visibility
  togglePassword.addEventListener("click", () => {
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    togglePassword.textContent = type === "text" ? "Hide" : "Show";
  });

  // Capitalize first letter of name
  const formatName = (value) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  ["input", "blur"].forEach((event) =>
    nameInput.addEventListener(event, () => {
      nameInput.value = formatName(nameInput.value.trim());
    })
  );

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const agreed = termsCheckbox.checked;

    const nameValid = /^[A-Za-z]{3,20}$/.test(name);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d@$!%*?&^#()._-]{8,}$/.test(
        password
      );

    nameInput.classList.toggle("is-invalid", !nameValid);
    emailInput.classList.toggle("is-invalid", !emailValid);
    passwordInput.classList.toggle("is-invalid", !passwordValid);
    termsCheckbox.classList.toggle("is-invalid", !agreed);

    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      errorMsg.textContent =
        "⚠️ This email is already registered. Please log in.";
      errorMsg.classList.remove("d-none");
      return;
    }

    if (nameValid && emailValid && passwordValid && agreed) {
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Also log in the new user
      localStorage.setItem("user", JSON.stringify({ name, email }));

      alert("Signed up successfully!");
      window.location.href = "index.html";
    } else {
      form.classList.add("was-validated");
    }
  });
});
