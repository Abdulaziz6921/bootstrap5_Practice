export function initCart() {
  // ---- CART STATE ----
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // ---- SELECTORS ----
  const cartBtns = document.querySelectorAll(".cart-btn"); // open cart buttons
  const cartEl = document.querySelector(".lc-cart"); // cart drawer element
  const cartOverlay = document.querySelector(".lc-cart__overlay");
  const closeCartBtn = document.querySelector(".lc-cart__close");
  const addToCartBtns = document.querySelectorAll(".addBtn"); // "Add to Cart"
  const cartItemsContainer = document.getElementById("cartItems");
  const cartEmpty = document.getElementById("cartEmpty");
  const cartSubtotal = document.getElementById("cartSubtotal");
  console.log(cart);

  // ---- CART TOGGLE ----
  cartBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      cartEl.classList.add("is-open");
    })
  );

  closeCartBtn.addEventListener("click", () => {
    cartEl.classList.remove("is-open");
  });

  cartOverlay.addEventListener("click", () => {
    cartEl.classList.remove("is-open");
  });

  // ---- RENDER CART ----
  function renderCart() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartEmpty.hidden = false;
      cartSubtotal.textContent = "$0.00";
      localStorage.setItem("cart", JSON.stringify(cart));
      return;
    }

    cartEmpty.hidden = true;

    let subtotal = 0;

    cart.forEach((item, index) => {
      subtotal += item.price * item.qty;

      const li = document.createElement("li");
      li.className = "lc-cart__item";
      li.innerHTML = `
            <img class="lc-cart__thumb" src="${item.img}" alt="${item.title}">
            <div class="lc-cart__info">
              <a href="#" class="lc-cart__title">${item.title}</a>
              <div class="lc-cart__meta">
                <span class="lc-cart__price">$${item.price.toFixed(2)}</span>
               
              </div>
              <button class="lc-cart__remove" data-index="${index}">Remove</button>
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

    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // ---- ADD TO CART ----
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      const title = card.querySelector(".card-title").textContent;
      const priceText = card
        .querySelector(".card-text")
        .textContent.replace(/[^0-9.]/g, "");
      const price = parseFloat(priceText);
      const img = card.querySelector("img").src;

      const existing = cart.find((item) => item.title === title);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ title, price, img, qty: 1 });
      }

      renderCart();
      cartEl.classList.add("is-open"); // auto open when added
    });
  });

  // ---- HANDLE CART ACTIONS ----
  cartItemsContainer.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.dataset.action === "inc") {
      cart[index].qty++;
    } else if (e.target.dataset.action === "dec") {
      cart[index].qty--;

      // ✅ remove item completely if qty is now 0
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
    } else if (e.target.classList.contains("lc-cart__remove")) {
      cart.splice(index, 1);
    } else {
      return;
    }

    renderCart();
  });

  // ---- INITIAL RENDER ----
  renderCart();
}
