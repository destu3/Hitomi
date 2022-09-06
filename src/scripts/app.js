import { createPopular_airing, createPopularUpcoming, createAllTimePopular, createTrending } from "./dom.js";
import { showQueryResults, loadMoreQueryResults } from "./anime.js";

// dom selection
export const mainSearchBar = document.getElementById("query");
const mainContainer = document.querySelector(".container");
const loadMoreBtn = document.getElementById("load-more");
const queryResults = document.querySelector(".query-results");
const backToTop = document.getElementById("back-to-top");

// functions invoked when page loads
window.addEventListener("DOMContentLoaded", () => {
  createPopular_airing();
  createPopularUpcoming();
  createTrending();
  createAllTimePopular();
  if (!queryResults.hasChildNodes()) {
    loadMoreBtn.style.transform = "scale(0)";
  }
});

// scroll related functionality
let prevScrollPos = window.scrollY;
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    nav.style.top = "0";
    loadMoreBtn.style.transform = "scale(0)";
    backToTop.style.transform = "scale(0)";
  } else {
    nav.style.top = "-75px";
    backToTop.style.transform = "scale(1)";
    if (queryResults.hasChildNodes()) {
      loadMoreBtn.style.transform = "scale(1) translate(-50%, -50%)";
    }
  }
  prevScrollPos = currentScrollPos;
});

// event listeners
mainSearchBar.addEventListener("input", e => {
  const landingPageSection = document.querySelectorAll(".landing-section");
  landingPageSection.forEach(section => {
    mainContainer.removeChild(section);
  });
  showQueryResults();
});

loadMoreBtn.addEventListener("click", loadMoreQueryResults);

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
