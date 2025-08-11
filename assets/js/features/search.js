import ScrollTrigger from "https://esm.sh/gsap@3.12.5/ScrollTrigger";

export function initSearch() {
  const searchInput = document.querySelector('input[type="search"]');
  const courseSection = document.getElementById("courses");
  const blogSection = document.getElementById("blog");
  const courseCards = document.querySelectorAll("#courses .card");
  const blogCards = document.querySelectorAll("#blog .card");
  const mainSections = document.querySelectorAll(".searchable-section");
  const noResultsMsg = document.getElementById("no-results");

  if (!searchInput) return; // No search bar on this page

  function filterCards(cards, keyword) {
    let found = false;
    cards.forEach((card) => {
      const titleEl = card.querySelector(".card-title");
      if (!titleEl) return;

      const rawText = titleEl.textContent;
      const trimmedKeyword = keyword.trim().toLowerCase();
      const isMatch = rawText.toLowerCase().includes(trimmedKeyword);

      card.classList.toggle("d-none", !isMatch);

      if (isMatch && trimmedKeyword !== "") {
        const regex = new RegExp(`(${trimmedKeyword})`, "gi");
        titleEl.innerHTML = rawText.replace(
          regex,
          `<span class="highlight">$1</span>`
        );
        found = true;
      } else {
        titleEl.innerHTML = rawText;
      }
    });
    return found;
  }

  function hideSection(e) {
    e.style.setProperty("display", "none", "important");
  }

  function showSection(e) {
    e.style.removeProperty("display");
  }

  function handleSearch(keyword) {
    const trimmed = keyword.trim().toLowerCase();

    if (trimmed === "") {
      mainSections.forEach(showSection);
      courseCards.forEach((card) => {
        card.classList.remove("d-none");
        const titleEl = card.querySelector(".card-title");
        if (titleEl) titleEl.innerHTML = titleEl.textContent;
      });
      blogCards.forEach((card) => {
        card.classList.remove("d-none");
        const titleEl = card.querySelector(".card-title");
        if (titleEl) titleEl.innerHTML = titleEl.textContent;
      });
      noResultsMsg.style.display = "none";
      ScrollTrigger.refresh();
      return;
    }

    const hasCourseMatch = filterCards(courseCards, trimmed);
    const hasBlogMatch = filterCards(blogCards, trimmed);

    mainSections.forEach(hideSection);
    if (hasCourseMatch) showSection(courseSection);
    if (hasBlogMatch) showSection(blogSection);

    noResultsMsg.style.display =
      !hasCourseMatch && !hasBlogMatch ? "block" : "none";

    ScrollTrigger.refresh();
  }

  // ✅ Attach search listener immediately
  searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });
  ScrollTrigger.refresh();
}
