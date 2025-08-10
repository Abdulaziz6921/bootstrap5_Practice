import HomePage from "../../pages/home.js";
import LoginPage, { initLogin } from "../../pages/login.js";
import SignUpPage, { initSignUp } from "../../pages/signup.js";
import { initNavbar } from "./navbar.js";

export function router() {
  const app = document.getElementById("app");
  const route = location.hash.slice(1).toLowerCase() || "/";

  // Change background except for home
  if (route !== "/") {
    document.body.classList.add("bg-primary");
  } else {
    document.body.classList.remove("bg-primary");
  }

  switch (route) {
    case "/":
      app.innerHTML = HomePage();
      break;

    case "/signup":
      app.innerHTML = SignUpPage();
      initSignUp();
      break;

    case "/login":
      app.innerHTML = LoginPage();
      initLogin();
      break;

    default:
      app.innerHTML = `<h1>404 Page Not Found</h1>`;
  }

  // ✅ Always run navbar logic after page content is rendered
  initNavbar();
}
