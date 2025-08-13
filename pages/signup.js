export default function SignUpPage() {
  return `
 <main
        class="signup-section d-flex flex-column align-items-center justify-content-center py-5 text-white fade-slide-up">
        <h1 class="mb-4">Create an account</h1>
        <div id="signupErrorMsg" class="d-none text-danger fw-semibold"></div>

        <form class="form bg-transparent p-4 rounded" style="min-width: 320px; max-width: 500px; width: 100%;"
            id="signUpForm" novalidate>
            <div class="form-group mb-4">
                <label for="name" class="form-label">Name:</label>
                <input type="text" class="form-control p-2" id="name" placeholder="Name" required
                    pattern="^[A-Za-z]{2,20}$" autocomplete="username" />
                <div class="invalid-feedback">
                    Name must be 2–20 letters, only alphabet characters allowed.
                </div>
            </div>

            <div class="form-group mb-4">
                <label for="email" class="form-label">Email address:</label>
                <input type="email" class="form-control p-2" id="email" placeholder="Email" required
                    autocomplete="email">
                <div class="invalid-feedback">Please enter a valid email address.</div>
            </div>
            <div class="form-group mb-4">
                <label for="password" class="form-label">Password:</label>
                <div class="input-group">
                    <input type="password" class="form-control p-2" id="password" placeholder="Password" required
                        minlength="8" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$" title="Must be at least 8 characters, include uppercase, lowercase, a number, and a special character" autocomplete="new-password" />

                    <button class="btn btn-outline-primary text-white border-white border-2 border"
                        style="border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem;" type="button"
                        id="togglePassword" tabindex="-1">
                        Show
                    </button>
                    <div class="invalid-feedback">
                        Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character
                    </div>

                </div>

            </div>


            <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" id="terms" required>
                <label class="form-check-label" for="terms">
                    I have read and agree to the <a href="#" class="text-white">Terms & Conditions</a>
                </label>
                <div class="invalid-feedback">
                    You must agree before submitting.
                </div>
            </div>
            <button type="submit" class="btn1 w-100 fw-semibold">Create account</button>
        </form>

        <p class="mt-3">Have an account? <a href="#/login" class="text-white">Login</a></p>



    </main>
  `;
}

import { showModal } from "../assets/js/components/modal.js";

export function initSignUp() {
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password);

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
      setTimeout(() => {
        errorMsg.classList.add("d-none");
      }, 4500);
      return;
    }

    if (nameValid && emailValid && passwordValid && agreed) {
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem("registeredUsers", JSON.stringify(users));

      // Also log in the new user
      localStorage.setItem("user", JSON.stringify({ name, email }));

      showModal({
        title: "Success",
        message: "Your account has been created successfully!",
        icon: { className: "bi bi-check2", ariaLabel: "Success" },
        primaryButton: {
          text: "Go Home",
          action: () => (window.location.href = "/"),
        },
      });
    } else {
      form.classList.add("was-validated");
    }
  });
}
