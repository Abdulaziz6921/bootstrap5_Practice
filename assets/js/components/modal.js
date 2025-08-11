export function createModal({ title, message, btnText = "OK", onConfirm }) {
  // Remove existing modal if any
  const existingModal = document.getElementById("globalModal");
  if (existingModal) existingModal.remove();

  // Create wrapper
  const modal = document.createElement("div");
  modal.id = "globalModal";
  modal.className = "custom-modal-backdrop show";

  modal.innerHTML = `
    <div class="custom-modal-content">
      <button class="custom-modal-close" id="closeModalBtn">&times;</button>
       <div class="custom-modal-icon">
      <i class="bi bi-check2"></i>
      </div>
      <div class="custom-modal-title">${title}</div>
      <div class="custom-modal-message">${message}</div>
      <button class="btn1" id="okModalBtn">${btnText}</button>
    </div>
  `;

  document.body.appendChild(modal);

  // Close modal
  const closeModal = () => {
    modal.classList.remove("show");
    setTimeout(() => modal.remove(), 200);
  };

  document
    .getElementById("closeModalBtn")
    .addEventListener("click", closeModal);
  document.getElementById("okModalBtn").addEventListener("click", () => {
    closeModal();
    if (onConfirm) onConfirm();
  });
}
