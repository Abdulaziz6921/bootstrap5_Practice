// modal.js
export function showModal({
  title = "",
  message = "",
  icon = null, // { className: "bi bi-check2", ariaLabel: "Success" }
  isDismissible = true, // click outside or X closes modal
  primaryButton = { text: "OK", className: "btn1", action: null },
  secondaryButton = null, // { text: "Cancel", className: "btn-secondary", action: null }
}) {
  // Remove existing modal
  const existingModal = document.getElementById("globalModal");
  if (existingModal) existingModal.remove();

  // Create wrapper
  const modal = document.createElement("div");
  modal.id = "globalModal";
  modal.className = "custom-modal-backdrop show";

  // Build icon HTML if provided
  const iconHTML = icon
    ? `<div class="custom-modal-icon">
         <i class="${icon.className}" aria-label="${icon.ariaLabel || ""}"></i>
       </div>`
    : "";

  // Build secondary button if provided
  const secondaryBtnHTML = secondaryButton
    ? `<button class="${
        secondaryButton.className || "btn-secondary"
      }" id="secondaryModalBtn">
         ${secondaryButton.text || "Cancel"}
       </button>`
    : "";

  // Modal HTML
  modal.innerHTML = `
    <div class="custom-modal-content">
      ${
        isDismissible
          ? `<button class="custom-modal-close" id="closeModalBtn" aria-label="Close">&times;</button>`
          : ""
      }
      ${iconHTML}
      <div class="custom-modal-title">${title}</div>
      <div class="custom-modal-message">${message}</div>
      <div class="custom-modal-actions">
        ${secondaryBtnHTML}
        <button class="${
          primaryButton.className || "btn1"
        }" id="primaryModalBtn">
          ${primaryButton.text || "OK"}
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal logic
  const closeModal = () => {
    modal.classList.remove("show");
    setTimeout(() => modal.remove(), 200);
  };

  // Event: close X
  if (isDismissible) {
    const closeBtn = document.getElementById("closeModalBtn");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Event: primary button
  document.getElementById("primaryModalBtn").addEventListener("click", () => {
    closeModal();
    if (typeof primaryButton.action === "function") primaryButton.action();
  });

  // Event: secondary button
  if (secondaryButton) {
    document
      .getElementById("secondaryModalBtn")
      .addEventListener("click", () => {
        closeModal();
        if (typeof secondaryButton.action === "function")
          secondaryButton.action();
      });
  }
}
