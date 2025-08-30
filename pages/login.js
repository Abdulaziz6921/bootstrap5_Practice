export default function LoginPage() {
  return ` 
  <main class="login-section d-flex flex-column align-items-center justify-content-center py-5 text-white fade-slide-up">
        <h1 class="mb-3">Login</h1>
        <p class="mb-4">Please fill your email and password to login</p>
        <div id="loginErrorMsg" class="d-none text-danger fw-semibold"></div>

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

// import { showModal } from "../assets/js/components/modal.js";
// import { auth } from "../assets/js/features/firebase.js";
// import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// export function initLogin() {
//   const form = document.querySelector("form");
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const errorMsg = document.getElementById("loginErrorMsg");

//   form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const enteredEmail = emailInput.value.trim();
//     const enteredPassword = passwordInput.value.trim();

//     try {
//       // ✅ Login with Firebase Auth
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         enteredEmail,
//         enteredPassword
//       );
//       const user = userCredential.user;

//       // ✅ Store session in localStorage (for UI usage)
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ uid: user.uid, email: user.email })
//       );

//       // ✅ Show success modal
//       showModal({
//         title: "Welcome Back!",
//         message: "Glad to have you here again.",
//         icon: { className: "bi bi-check2", ariaLabel: "Success" },
//         isDismissible: false,
//         primaryButton: {
//           text: "Go Home",
//           action: () => (window.location.href = "/"),
//         },
//       });
//     } catch (error) {
//       console.error("Login failed:", error);
//       errorMsg.textContent = "⚠️ " + error.message;
//       errorMsg.classList.remove("d-none");
//       setTimeout(() => {
//         errorMsg.classList.add("d-none");
//       }, 4000);
//     }
//   });
// }
import { showModal } from "../assets/js/components/modal.js";
import { auth } from "../assets/js/features/firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  showPageLoader,
  hidePageLoader,
} from "../assets/js/components/loader.js"; // ✅ same as signup

export function initLogin() {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const errorMsg = document.getElementById("loginErrorMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const enteredEmail = emailInput.value.trim();
    const enteredPassword = passwordInput.value.trim();

    try {
      // ✅ Show loader immediately when login starts
      showPageLoader();

      // ✅ Login with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );
      const user = userCredential.user;

      // ✅ Store session in localStorage (for UI usage)
      localStorage.setItem(
        "user",
        JSON.stringify({ uid: user.uid, email: user.email })
      );

      // ✅ Hide loader before showing modal
      hidePageLoader();

      // ✅ Show success modal
      showModal({
        title: "Welcome Back!",
        message: "Glad to have you here again.",
        icon: { className: "bi bi-check2", ariaLabel: "Success" },
        isDismissible: false,
        primaryButton: {
          text: "Go Home",
          action: () => (window.location.href = "/"),
        },
      });
    } catch (error) {
      // ✅ Hide loader if login fails
      hidePageLoader();

      if (error.code === "auth/invalid-credential") {
        errorMsg.textContent =
          "⚠️ Please check your email or password — they appear to be incorrect.";
      } else {
        errorMsg.textContent = "⚠️ Unable to sign in. Please try again.";
      }
      console.error("Login failed:", error);
      errorMsg.classList.remove("d-none");
      setTimeout(() => {
        errorMsg.classList.add("d-none");
      }, 4500);
    }
  });
}
