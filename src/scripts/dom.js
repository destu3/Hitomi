import { getFavorite, getPopularAiring, getPopularUpcoming, getAllTimePopular } from "./anime.js";

// creating landing page sections
export function createFavoriteSection() {
  const mainContainer = document.querySelector(".container");

  const landingSect = document.createElement("section");
  landingSect.classList.add("landing-section");
  const trendingHeading = document.createElement("h3");
  trendingHeading.textContent = "MOST BELOVED";
  const landingSectMedia = document.createElement("div");
  landingSectMedia.classList.add("landing-section-media", "favorite");
  landingSect.append(trendingHeading, landingSectMedia);
  getFavorite();

  mainContainer.appendChild(landingSect);
}

export function createPopular_seasonal() {
  const mainContainer = document.querySelector(".container");

  const landingSect = document.createElement("section");
  landingSect.classList.add("landing-section");
  const trendingHeading = document.createElement("h3");
  trendingHeading.textContent = "POPULAR: CURRENTLY AIRING";
  const landingSectMedia = document.createElement("div");
  landingSectMedia.classList.add("landing-section-media", "popular-airing");
  landingSect.append(trendingHeading, landingSectMedia);
  getPopularAiring();

  mainContainer.appendChild(landingSect);
}

export function createPopularUpcoming() {
  const mainContainer = document.querySelector(".container");

  const landingSect = document.createElement("section");
  landingSect.classList.add("landing-section");
  const trendingHeading = document.createElement("h3");
  trendingHeading.textContent = "POPULAR: UPCOMING";
  const landingSectMedia = document.createElement("div");
  landingSectMedia.classList.add("landing-section-media", "popular-upcoming");
  landingSect.append(trendingHeading, landingSectMedia);
  getPopularUpcoming();

  mainContainer.appendChild(landingSect);
}

export function createAllTimePopular() {
  const mainContainer = document.querySelector(".container");

  const landingSect = document.createElement("section");
  landingSect.classList.add("landing-section");
  const trendingHeading = document.createElement("h3");
  trendingHeading.textContent = "ALL TIME POPULAR";
  const landingSectMedia = document.createElement("div");
  landingSectMedia.classList.add("landing-section-media", "all-time-popular");
  landingSect.append(trendingHeading, landingSectMedia);
  getAllTimePopular();

  mainContainer.appendChild(landingSect);
}

export function renderMedia(array, lp_section) {
  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("p");
    title.classList.add("title");
    poster.src = anime.images.jpg.image_url;
    title.textContent = anime.title_english;
    animeCard.append(poster, title);

    const landingSectMedia = document.querySelector(`.${lp_section}`);
    landingSectMedia.appendChild(animeCard);
  });
}
