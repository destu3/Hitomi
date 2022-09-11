import { getPopularAiring, getPopularUpcoming, getAllTimePopular, getTrending } from "./anime.js";

// creating landing page sections
function createLpSection(sectionName, sectionClassName, sectionFunction) {
  const mainContainer = document.querySelector(".container");

  const landingSect = document.createElement("section");
  landingSect.classList.add("landing-section");
  const trendingHeading = document.createElement("h3");
  trendingHeading.textContent = `${sectionName}`;
  const landingSectMedia = document.createElement("div");
  landingSectMedia.classList.add("landing-section-media", `${sectionClassName}`);
  landingSect.append(trendingHeading, landingSectMedia);
  sectionFunction();

  mainContainer.appendChild(landingSect);
}

export function createPopular_airing() {
  createLpSection("POPULAR: CURRENTLY AIRING", "popular-airing", getPopularAiring);
}

export function createPopularUpcoming() {
  createLpSection("POPULAR: UPCOMING", "popular-upcoming", getPopularUpcoming);
}

export function createAllTimePopular() {
  createLpSection("ALL TIME POPULAR", "all-time-popular", getAllTimePopular);
}

export function createTrending() {
  createLpSection("TRENDING NOW", "trending", getTrending);
}

export function clearAnime(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

export function showOverlay(anime) {
  const overlay = document.getElementById("overlay");
  const coverImg = document.getElementById("cover-image");
  if (anime.bannerImage === null) {
    coverImg.style.backgroundImage = `url(${anime.coverImage.extraLarge})`;
    coverImg.style.backgroundSize = "contain";
    coverImg.style.backgroundRepeat = "repeat-x";
  } else {
    coverImg.style.backgroundImage = `url(${anime.bannerImage})`;
    coverImg.style.backgroundSize = "cover";
    coverImg.style.backgroundRepeat = "none";
  }

  const posterImg = document.getElementById("poster-img");
  posterImg.src = anime.coverImage.extraLarge;
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "all";
}
