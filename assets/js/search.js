const searchInput = document.querySelector('input[type="search"]');
const courseSection = document.getElementById("courses");
const blogSection = document.getElementById("blog");
const courseCards = document.querySelectorAll("#courses .card");
const blogCards = document.querySelectorAll("#blog .card");
const mainSections = document.querySelectorAll(".searchable-section");
const noResultsMsg = document.getElementById("no-results");
// console.log(mainSections);

function filterCards(cards, keyword) {
  let found = false;

  cards.forEach((card) => {
    const titleEl = card.querySelector(".card-title");
    if (!titleEl) return;

    const rawText = titleEl.textContent;
    const lowerTitle = rawText.toLowerCase();
    const trimmedKeyword = keyword.trim().toLowerCase();
    const isMatch = lowerTitle.includes(trimmedKeyword);

    card.style.display = isMatch ? "flex" : "none";

    if (isMatch && trimmedKeyword !== "") {
      // Highlight match
      const regex = new RegExp(`(${trimmedKeyword})`, "gi");
      const highlighted = rawText.replace(
        regex,
        `<span class="highlight">$1</span>`
      );
      titleEl.innerHTML = highlighted;
      found = true;
    } else {
      // Reset to original text if not matching
      titleEl.textContent = rawText;
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
    // ✅ Reset view: show all sections and cards
    mainSections.forEach((sec) => showSection(sec));
    courseCards.forEach((card) => (card.style.display = "flex"));
    blogCards.forEach((card) => (card.style.display = "flex"));
    noResultsMsg.style.display = "none";
    return;
  }

  // ✅ Filter cards
  const hasCourseMatch = filterCards(courseCards, trimmed);
  const hasBlogMatch = filterCards(blogCards, trimmed);

  // ✅ Hide all sections using helper
  mainSections.forEach((sec) => hideSection(sec));

  // ✅ Show only matched sections using helper
  if (hasCourseMatch) showSection(courseSection);
  if (hasBlogMatch) showSection(blogSection);

  // ✅ Handle "no results"
  noResultsMsg.style.display =
    !hasCourseMatch && !hasBlogMatch ? "block" : "none";
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    handleSearch(e.target.value);
  });
}
console.log("Sections hidden:", mainSections.length);
