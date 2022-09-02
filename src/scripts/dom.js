import { getPopularAiring, getPopularUpcoming, getAllTimePopular } from "./anime.js";

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

export function createPopular_seasonal() {
  createLpSection("POPULAR: CURRENTLY AIRING", "popular-airing", getPopularAiring);
}

export function createPopularUpcoming() {
  createLpSection("POPULAR: UPCOMING", "popular-upcoming", getPopularUpcoming);
}

export function createAllTimePopular() {
  createLpSection("ALL TIME POPULAR", "all-time-popular", getAllTimePopular);
}

// anime rendering
export function renderLpAnime(array, lp_section) {
  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("p");
    title.classList.add("title");
    poster.src = anime.images.jpg.image_url;
    if (anime.title_english == null) {
      title.textContent = anime.title;
    } else {
      title.textContent = anime.title_english;
    }

    animeCard.append(poster, title);
    const landingSectMedia = document.querySelector(`.${lp_section}`);
    landingSectMedia.appendChild(animeCard);
  });
}

export function renderQueriedAnime(array) {
  const queryResultsContainer = document.querySelector(".query-results");
  queryResultsContainer.classList.add("visible");
  clearAnime(queryResultsContainer);

  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("p");
    title.classList.add("title");
    poster.src = anime.images.jpg.image_url;
    if (anime.title_english == null) {
      title.textContent = anime.title;
    } else {
      title.textContent = anime.title_english;
    }

    animeCard.append(poster, title);
    queryResultsContainer.appendChild(animeCard);
  });
}

export function clearAnime(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
