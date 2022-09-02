import { createPopular_seasonal, createPopularUpcoming, createAllTimePopular } from "./dom.js";
import { showQueryResults } from "./anime.js";

// dom selection
export const mainSearchBar = document.getElementById("query");
const mainContainer = document.querySelector(".container");

// functions invoked when page loads
window.addEventListener("DOMContentLoaded", () => {
  createPopular_seasonal();
  createPopularUpcoming();
  createAllTimePopular();
});

// hide navbar on scroll
let prevScrollPos = window.scrollY;
window.onscroll = () => {
  const nav = document.getElementById("nav");
  let currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    nav.style.top = "0";
  } else {
    nav.style.top = "-75px";
  }
  prevScrollPos = currentScrollPos;
};

// event listeners
mainSearchBar.addEventListener("keydown", e => {
  if (e.code === "Enter") {
    const landingPageSection = document.querySelectorAll(".landing-section");
    landingPageSection.forEach(section => {
      mainContainer.removeChild(section);
    });
    showQueryResults();
  }
});