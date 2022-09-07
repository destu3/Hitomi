import { clearAnime, showDetailsOverlay } from "./dom.js";

// anime rendering functions
export function renderCards(array, $section) {
  // create media card for each object in array
  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("a");
    title.href = `https://kitsu.io/anime/${anime.attributes.slug}`;
    title.target = "_target";
    title.classList.add("title");
    title.textContent = determineTitle(anime);
    poster.src = anime.attributes.posterImage.large;
    const animeDetails = createAnimeDetails(anime);
    animeCard.append(poster, title, animeDetails);
    const section = document.querySelector(`.${$section}`);

    animeCard.addEventListener("click", () => {
      showDetailsOverlay(anime);
      console.log(anime);
    });

    section.appendChild(animeCard);
  });
}

// creates details bubble for every all anime
function createAnimeDetails(anime) {
  const animeDetails = document.createElement("div");
  animeDetails.classList.add("speech-bubble", "anime-details");
  const canonicalTitle = document.createElement("p");
  canonicalTitle.classList.add("canonical-title");
  canonicalTitle.textContent = anime.attributes.canonicalTitle;
  const averageRating = document.createElement("p");
  averageRating.classList.add("average-rating", determineRatingColor(anime));
  averageRating.textContent = `${String(Math.round(anime.attributes.averageRating))}%`;
  const mediaType = document.createElement("p");
  mediaType.classList.add("media-type");
  mediaType.textContent = determineMediaType(anime);
  const animeStatus = document.createElement("span");
  animeStatus.classList.add("status");
  animeStatus.textContent = determineStatus(anime);
  mediaType.appendChild(animeStatus);
  const synopsis = document.createElement("p");
  synopsis.classList.add("synopsis");
  synopsis.textContent = anime.attributes.synopsis;
  const ytBtn = document.createElement("button");
  ytBtn.classList.add("icon-item", "yt-video");
  const ytLink = document.createElement("a");
  ytLink.href = ` https://www.youtube.com/watch?v=${anime.attributes.youtubeVideoId}`;
  ytLink.target = "_blank";
  ytLink.classList.add("icon-link");
  const ytIcon = document.createElement("i");
  ytIcon.classList.add("fab", "fa-youtube");
  ytLink.appendChild(ytIcon);
  ytBtn.appendChild(ytLink);
  animeDetails.append(canonicalTitle, averageRating, mediaType, synopsis, ytBtn);
  return animeDetails;
}

// creates cards for anime that can be seen on landing page
export function renderLpAnime(array, lp_section) {
  renderCards(array, lp_section);
}

const queryResultsContainer = document.querySelector(".query-results");

// creates cards for anime that match search term and renders them
export function renderQueriedAnime(array, section) {
  queryResultsContainer.classList.add("visible");
  clearAnime(queryResultsContainer);

  renderCards(array, section);
}

// creates more cards for anime that matches search term and renders them
export function loadMoreAnime(array, section) {
  renderCards(array, section);
}
// end of anime rendering functions

function determineTitle(anime) {
  let title = null;
  const titleObject = anime.attributes.titles;
  if (titleObject.hasOwnProperty("en")) {
    title = titleObject.en;
  } else {
    title = anime.attributes.canonicalTitle;
  }
  return title;
}

function determineRatingColor(anime) {
  let ratingValue = null;
  const roundedRating = Math.round(anime.attributes.averageRating);
  if (roundedRating <= 50) {
    ratingValue = "poor-avg-rating";
  } else if (roundedRating > 50 && roundedRating < 70) {
    ratingValue = "ok-avg-rating";
  } else if (roundedRating >= 70 && roundedRating < 80) {
    ratingValue = "good-avg-rating";
  } else {
    ratingValue = "great-avg-rating";
  }
  return ratingValue;
}

function determineMediaType(anime) {
  let mediaType = null;
  const showType = anime.attributes.showType;
  if (showType == "TV") {
    mediaType = "TV Show • ";
  } else if (showType == "movie") {
    mediaType = "Movie • ";
  } else if (showType == "OVA") {
    mediaType = "OVA • ";
  } else if (showType == "ONA") {
    mediaType = "ONA • ";
  }
  return mediaType;
}

function determineStatus(anime) {
  let status = null;
  const animeStatus = anime.attributes.status;
  if (animeStatus == "current") {
    status = "Currently Airing";
  } else if (animeStatus == "finished") {
    status = `Finished • ${anime.attributes.episodeCount} episodes `;
  } else if (animeStatus == "upcoming") {
    status = `Upcoming • ${anime.attributes.startDate} `;
  }
  return status;
}
