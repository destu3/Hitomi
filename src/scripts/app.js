import { createPopular_airing, createPopularUpcoming, createAllTimePopular, createTrending } from "./dom.js";
import { showQueryResults, loadMoreQueryResults } from "./anime.js";

// dom selection
export const mainSearchBar = document.getElementById("query");
const mainContainer = document.querySelector(".container");
const loadMoreBtn = document.getElementById("load-more");

// functions invoked when page loads
window.addEventListener("DOMContentLoaded", () => {
  createPopular_airing();
  createPopularUpcoming();
  createTrending();
  createAllTimePopular();
});

// hide navbar on scroll
let prevScrollPos = window.scrollY;
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    nav.style.top = "0";
  } else {
    nav.style.top = "-75px";
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
