export default function LoginPage() {
  return ` 
  <main class="login-section d-flex flex-column align-items-center justify-content-center py-5 text-white fade-slide-up">
        <h1 class="mb-3">Login</h1>
        <p class="mb-4">Please fill your email and password to login</p>

        <form id="loginForm" class="form  bg-transparent p-4 rounded"
            style="min-width: 320px; max-width: 500px; width: 100%;">
            <div class="form-group mb-4">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control p-2" id="email" placeholder="Email" required
                    autocomplete="email" />
            </div>

            <div class="form-group mb-4">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control p-2" id="password" placeholder="Password" required
                    autocomplete="current-password" />
            </div>

            <button type="submit" class="btn1 w-100">Login</button>
        </form>

        <p class="mt-3">Don’t have an account? <a href="#/signup" class="text-white">Register</a></p>
    </main>`;
}

export function initLogin() {
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
}
