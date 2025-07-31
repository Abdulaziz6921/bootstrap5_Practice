import ScrollTrigger from "https://esm.sh/gsap@3.12.5/ScrollTrigger";
document.addEventListener("include:loaded", () => {
  const searchInput = document.querySelector('input[type="search"]');
  const courseSection = document.getElementById("courses");
  const blogSection = document.getElementById("blog");
  const courseCards = document.querySelectorAll("#courses .card");
  const blogCards = document.querySelectorAll("#blog .card");
  const mainSections = document.querySelectorAll(".searchable-section");
  const noResultsMsg = document.getElementById("no-results");

  if (!searchInput) return;

  function filterCards(cards, keyword) {
    let found = false;
    cards.forEach((card) => {
      const titleEl = card.querySelector(".card-title");
      if (!titleEl) return;

      const rawText = titleEl.textContent;
      const lowerTitle = rawText.toLowerCase();
      const trimmedKeyword = keyword.trim().toLowerCase();
      const isMatch = lowerTitle.includes(trimmedKeyword);

      card.classList.toggle("d-none", !isMatch);

      if (isMatch && trimmedKeyword !== "") {
        const regex = new RegExp(`(${trimmedKeyword})`, "gi");
        const highlighted = rawText.replace(
          regex,
          `<span class="highlight">$1</span>`
        );
        titleEl.innerHTML = highlighted;
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
      mainSections.forEach((sec) => showSection(sec));
      courseCards.forEach((card) => {
        card.classList.remove("d-none");
        const titleEl = card.querySelector(".card-title");
        if (titleEl) {
          titleEl.innerHTML = titleEl.textContent;
        }
      });
      blogCards.forEach((card) => {
        card.classList.remove("d-none");
        const titleEl = card.querySelector(".card-title");
        if (titleEl) {
          titleEl.innerHTML = titleEl.textContent;
        }
      });
      noResultsMsg.style.display = "none";
      window.location.reload();
      return;
    }

    const hasCourseMatch = filterCards(courseCards, trimmed);
    const hasBlogMatch = filterCards(blogCards, trimmed);

    mainSections.forEach((sec) => hideSection(sec));
    if (hasCourseMatch) showSection(courseSection);
    if (hasBlogMatch) showSection(blogSection);

    noResultsMsg.style.display =
      !hasCourseMatch && !hasBlogMatch ? "block" : "none";

    ScrollTrigger.refresh();
  }

  // ✅ Attach search input listener AFTER partial is loaded
  searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });
});
