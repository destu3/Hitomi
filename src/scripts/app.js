import { createFavoriteSection, createPopular_seasonal, createPopularUpcoming, createAllTimePopular } from "./dom.js";

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

// functions invoked when page loads
window.addEventListener("DOMContentLoaded", () => {
  createFavoriteSection();
  createPopular_seasonal();
  createPopularUpcoming();
  createAllTimePopular();
});
