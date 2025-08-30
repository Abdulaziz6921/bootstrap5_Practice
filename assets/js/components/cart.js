import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { showModal } from "./modal.js";

export function initCart() {
  // ---- FIREBASE ----
  const auth = getAuth();
  const db = getFirestore();

  // ---- STATE ----
  let cart = []; // in-memory cart
  let currentUser = null; // firebase user (or null)
  let saveTimeout = null; // debounce timer for Firestore writes

  // ---- SELECTORS ----
  const cartEl = document.querySelector(".lc-cart");
  const toggleCartBtns = document.querySelectorAll("[data-cart-toggle]");
  const addToCartBtns = document.querySelectorAll(".addBtn");
  const cartItemsContainer = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartSubtotal = document.getElementById("cartSubtotal");
  const cartBadges = document.querySelectorAll(".lc-cart__badge");
  const cartFooter = document.querySelector(".lc-cart__footer");

  // ---------- LocalStorage helpers ----------
  const LOCAL_KEY = "cart"; // keep same key to avoid breaking existing users

  function loadCartFromLocal() {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCartToLocal() {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(cart));
    } catch {
      /* ignore quota errors */
    }
  }

  // ---------- Firestore helpers ----------
  async function debouncedSaveToFirestore(delayMs = 500) {
    if (!currentUser) return; // guests don't sync
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
      try {
        const cartRef = doc(db, "carts", currentUser.uid);
        await setDoc(cartRef, { items: cart }, { merge: true });
      } catch (err) {
        // Don't break UI if network fails; user keeps local cart
        console.error("Cart sync failed (will retry on next change):", err);
      }
    }, delayMs);
  }

  async function getFirestoreCart(uid) {
    try {
      const cartRef = doc(db, "carts", uid);
      const snap = await getDoc(cartRef);
      return snap.exists() ? snap.data().items || [] : [];
    } catch (err) {
      console.error("Failed to load cart from Firestore:", err);
      return [];
    }
  }

  // Merge two carts by title (keeps your existing identity-by-title logic)
  function mergeCarts(base, incoming) {
    const map = new Map();
    base.forEach((item) => map.set(item.title, { ...item }));
    incoming.forEach((item) => {
      const prev = map.get(item.title);
      if (prev) {
        prev.qty = (prev.qty || 0) + (item.qty || 0);
        map.set(item.title, prev);
      } else {
        map.set(item.title, { ...item });
      }
    });
    return Array.from(map.values());
  }

  // ---------- UI ----------
  function updateCartBadge() {
    const uniqueCount = cart.length;
    cartBadges.forEach((badge) => {
      badge.textContent = uniqueCount;
      badge.style.display = uniqueCount > 0 ? "inline-grid" : "none";
    });
  }

  function renderCart() {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = "";

    if (!cart || cart.length === 0) {
      if (cartEmpty) cartEmpty.hidden = false;
      if (cartFooter) cartFooter.style.display = "none";
      if (cartSubtotal) cartSubtotal.textContent = "$0.00";
      updateCartBadge();
      return;
    }

    if (cartEmpty) cartEmpty.hidden = true;
    if (cartFooter) cartFooter.style.display = "";

    let subtotal = 0;

    cart.forEach((item, index) => {
      subtotal += (item.price || 0) * (item.qty || 0);

      const li = document.createElement("li");
      li.className = "lc-cart__item";
      li.innerHTML = `
        <div class="lc-cart__detail">
          <img class="lc-cart__thumb" src="${item.img}" alt="${item.title}">
          <div class="lc-cart__info">
            <a href="#" class="lc-cart__title">${item.title}</a>
            <div class="lc-cart__meta">
              <span class="lc-cart__price">$${(item.price || 0).toFixed(
                2
              )}</span>
            </div>
            <button class="lc-cart__remove" data-index="${index}">Remove</button>
          </div>
        </div>
        <div class="lc-cart__qty">
          <button class="lc-cart__qty-btn" data-action="dec" data-index="${index}">−</button>
          <input class="lc-cart__qty-input" type="number" value="${
            item.qty
          }" min="1" readonly>
          <button class="lc-cart__qty-btn" data-action="inc" data-index="${index}">+</button>
        </div>
      `;
      cartItemsContainer.appendChild(li);
    });

    if (cartSubtotal) cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    updateCartBadge();
  }

  // ---------- Common mutation -> persist + render ----------
  function commitCartChanges() {
    saveCartToLocal(); // instant
    debouncedSaveToFirestore(); // background (if logged in)
    renderCart(); // instant UI
  }

  // ---------- Toggle cart ----------
  toggleCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (cartEl) cartEl.classList.toggle("is-open");
    });
  });

  // ---------- Add to cart ----------
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (!currentUser) {
        // Looks normal, but shows modal if guest
        showModal({
          title: "Please log in",
          message: "You need to log in or sign up to add items to your cart.",
          icon: { className: "fa fa-lock", ariaLabel: "Login required" },
          primaryButton: {
            text: "Sign Up",
            className: "btn1",
            action: () => {
              window.location.hash = "/signup";
            },
          },
          secondaryButton: {
            text: "Login",
            className: "btn1",
            action: () => {
              window.location.hash = "/login";
            },
          },
        });
        return;
      }

      const card = e.target.closest(".card");
      if (!card) return;

      const title = (
        card.querySelector(".card-title")?.textContent || ""
      ).trim();
      const priceText = (
        card.querySelector(".card-text")?.textContent || ""
      ).replace(/[^0-9.]/g, "");
      const price = parseFloat(priceText || "0") || 0;
      const img = card.querySelector("img")?.src || "";

      if (!title) return;

      const existing = cart.find((i) => i.title === title);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ title, price, img, qty: 1 });
      }

      commitCartChanges();
      if (cartEl) cartEl.classList.add("is-open");
    });
  });

  // ---------- Qty / Remove (event delegation) ----------
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener("click", (e) => {
      const target = e.target;
      const index = Number(target?.dataset?.index);
      if (Number.isNaN(index)) return;

      if (target.dataset.action === "inc") {
        cart[index].qty += 1;
      } else if (target.dataset.action === "dec") {
        cart[index].qty -= 1;
        if (cart[index].qty <= 0) cart.splice(index, 1);
      } else if (target.classList.contains("lc-cart__remove")) {
        cart.splice(index, 1);
      } else {
        return;
      }

      commitCartChanges();
    });
  }

  // ---------- Auth listener (load & sync) ----------
  onAuthStateChanged(auth, async (user) => {
    currentUser = user;

    // Always start from local for instant UI
    cart = loadCartFromLocal();
    renderCart();

    if (user) {
      // Load remote and merge with local (preserve both)
      const remoteCart = await getFirestoreCart(user.uid);
      if (remoteCart.length === 0 && cart.length > 0) {
        // No remote yet, push local up
        await debouncedSaveToFirestore(0); // write immediately
      } else if (remoteCart.length > 0) {
        const merged = mergeCarts(remoteCart, cart);
        cart = merged;
        saveCartToLocal();
        await debouncedSaveToFirestore(0); // write immediately
        renderCart();
      }
    } else {
      cart = [];
      localStorage.removeItem(LOCAL_KEY);
      renderCart();
    }
  });

  // ---------- Initial UI (before auth resolves) ----------
  cart = loadCartFromLocal();
  renderCart();
}
