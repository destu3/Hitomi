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

// anime rendering
export function renderLpAnime(array, lp_section) {
  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("p");
    title.classList.add("title");
    poster.src = anime.attributes.posterImage.original;
    const animeDetails = document.createElement("div");
    animeDetails.classList.add("speech-bubble", "anime-details");

    const titlesObject = anime.attributes.titles;
    if (titlesObject.hasOwnProperty("en")) {
      title.textContent = titlesObject.en;
    } else if (titlesObject.hasOwnProperty("en_us")) {
      title.textContent = titlesObject.en_us;
    } else {
      title.textContent = anime.attributes.canonicalTitle;
    }

    // event listeners for anime cards
    animeCard.addEventListener("click", () => {
      console.log(anime);
    });

    animeCard.append(poster, title, animeDetails);
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
    poster.src = anime.attributes.posterImage.original;
    const animeDetails = document.createElement("div");
    animeDetails.classList.add("speech-bubble", "anime-details");

    const titlesObject = anime.attributes.titles;
    if (titlesObject.hasOwnProperty("en")) {
      title.textContent = titlesObject.en;
    } else if (titlesObject.hasOwnProperty("en_us")) {
      title.textContent = titlesObject.en_us;
    } else {
      title.textContent = anime.attributes.canonicalTitle;
    }

    animeCard.append(poster, title, animeDetails);
    queryResultsContainer.appendChild(animeCard);
  });
}

export function clearAnime(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
