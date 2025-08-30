// Full page loader
export function showPageLoader() {
  let loaderOverlay = document.getElementById("loaderOverlay");
  if (!loaderOverlay) {
    loaderOverlay = document.createElement("div");
    loaderOverlay.id = "loaderOverlay";
    loaderOverlay.innerHTML = `
    <div class="curly-loader">
      ${Array(12).fill("<div></div>").join("")}
    </div>
  `;
    loaderOverlay.className = "loaderOverlay";
    document.body.appendChild(loaderOverlay);
  }
  loaderOverlay.style.display = "flex";
}

export function hidePageLoader() {
  const loaderOverlay = document.getElementById("loaderOverlay");
  if (loaderOverlay) loaderOverlay.style.display = "none";
}

// Inline loader (for navbar, buttons, etc.)
export function showInlineLoader(target, size = 20) {
  if (!target) return;

  // Prevent stacking loaders if already applied
  if (target.dataset.oldContent !== undefined) return;

  // Save old content
  target.dataset.oldContent = target.innerHTML;

  target.innerHTML = `
    <div class="curly-loader" style="--loader-size:${size}px">
      ${Array(12).fill("<div></div>").join("")}
    </div>
  `;
}

export function hideInlineLoader(target) {
  if (!target) return;

  if (target.dataset.oldContent !== undefined) {
    target.innerHTML = target.dataset.oldContent;
    delete target.dataset.oldContent;
  }
}
