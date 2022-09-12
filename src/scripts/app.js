import {
  createPopular_airing,
  createPopularNextSeason,
  createAllTimePopular,
  createTrending,
  removeChildNodes,
} from "./dom.js";
import { showQueryResults, loadMoreQueryResults, getPopularNextSeason } from "./anime.js";
import "../styles/main.css";

// dom selection
export const mainSearchBar = document.getElementById("query");
const mainContainer = document.querySelector(".container");
const loadMoreBtn = document.getElementById("load-more");
const queryResults = document.querySelector(".query-results");
const backToTop = document.getElementById("back-to-top");
const clearBtn = document.querySelector(".clear-btn");
const overlay = document.getElementById("overlay");
const closeOverlayBtn = document.querySelector(".button");
const showDropDown = document.querySelector(".fa-bars");
const hideDropDown = document.querySelector(".fa-angles-up");
const navLinks = document.querySelector(".links");

// functions invoked when page loads
window.addEventListener("DOMContentLoaded", () => {
  createPopular_airing();
  createPopularNextSeason();
  createTrending();
  createAllTimePopular();
  if (!queryResults.hasChildNodes()) {
    loadMoreBtn.style.transform = "scale(0)";
  }
  mainSearchBar.focus();
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
    if (queryResults.hasChildNodes() && screen.width > 760) {
      loadMoreBtn.style.transform = "scale(1) translate(-50%, -50%)";
    } else {
      if (queryResults.hasChildNodes()) {
        loadMoreBtn.style.transform = "scale(1) translate(0)";
      }
    }
  }
  prevScrollPos = currentScrollPos;
});

let pageNum = 1;

// event listeners
mainSearchBar.addEventListener("input", e => {
  const landingPageSection = document.querySelectorAll(".landing-section");
  landingPageSection.forEach(section => {
    mainContainer.removeChild(section);
  });
  showQueryResults(pageNum);
});

loadMoreBtn.addEventListener("click", () => {
  pageNum++;
  loadMoreQueryResults(pageNum);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

clearBtn.addEventListener("click", () => {
  if (queryResults.classList.contains("visible")) {
    queryResults.classList.remove("visible");
    mainSearchBar.value = " ";
    removeChildNodes(queryResults);
    createPopular_airing();
    createPopularUpcoming();
    createTrending();
    createAllTimePopular();
  }
});

closeOverlayBtn.addEventListener("click", () => {
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
  document.body.classList.remove("no-scroll");
  document.querySelectorAll(".speech-bubble").forEach(bubble => {
    bubble.classList.remove("hide-bubble");
  });
});

// toggle drop down nav
showDropDown.addEventListener("click", () => {
  navLinks.classList.add("show-drop-down");
});

hideDropDown.addEventListener("click", () => {
  navLinks.classList.remove("show-drop-down");
});

// function to get current season and next season
function getCurrentSeason() {
  // It's plus one because January is index 0
  const now = new Date();
  const month = now.getMonth() + 1;

  if (month > 3 && month < 6) {
    return "spring";
  }

  if (month > 6 && month < 9) {
    return "summer";
  }

  if (month > 9 && month < 12) {
    return "fall";
  }

  if (month >= 1 && month < 3) {
    return "winter";
  }

  const day = now.getDate();
  if (month === 3) {
    return day < 22 ? "winter" : "spring";
  }

  if (month === 6) {
    return day < 22 ? "spring" : "summer";
  }

  if (month === 9) {
    return day < 22 ? "summer" : "fall";
  }

  if (month === 12) {
    return day < 22 ? "fall" : "winter";
  }

  console.error("Unable to calculate current season");
}

export function getNextSeason() {
  const currentSeason = getCurrentSeason();
  let nextSeason = null;

  if (currentSeason == "fall") {
    nextSeason = "WINTER";
  } else if (currentSeason == "spring") {
    nextSeason = "SUMMER";
  } else if (currentSeason == "summer") {
    nextSeason = "FALL";
  } else if (nextSeason == "winter") {
    nextSeason = "SPRING";
  }
  return nextSeason;
}
