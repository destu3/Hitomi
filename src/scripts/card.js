import { removeChildNodes, showOverlay } from "./dom.js";

// anime rendering functions
export function renderCards(array, $section) {
  // create media card for each object in array
  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("div");
    poster.classList.add("poster");
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = determineTitle(anime);
    poster.style.backgroundImage = `url(${anime.coverImage.extraLarge})`;
    poster.style.backgroundSize = "cover";
    poster.style.backgroundRepeat = "none";
    poster.style.backgroundPosition = "center";
    const animeDetails = createAnimeDetails(anime);
    animeCard.append(poster, title);
    const section = document.querySelector(`.${$section}`);
    animeCard.append(poster, title);
    poster.append(animeDetails);

    animeCard.addEventListener("click", () => {
      const animeBubble = animeCard.querySelector(".speech-bubble");
      animeBubble.classList.add("hide-bubble");
      document.body.classList.add("no-scroll");
      showOverlay(anime);
    });

    animeCard.addEventListener("mouseover", () => {
      if (anime.coverImage.color != null) {
        title.style.color = anime.coverImage.color;
      } else {
        title.style.color = "var(--brand-blue-color)";
      }

      animeCard.querySelector(".canonical-title").style.color = anime.coverImage.color;
    });

    animeCard.addEventListener("mouseout", () => {
      title.style.color = "var(--grey-text-color-2)";
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
  canonicalTitle.textContent = determineTitle(anime);
  const mediaType = document.createElement("p");
  mediaType.classList.add("media-type");
  mediaType.textContent = determineMediaType(anime);
  const animeStatus = document.createElement("span");
  animeStatus.classList.add("status");
  animeStatus.textContent = determineStatus(anime);
  mediaType.appendChild(animeStatus);
  const synopsis = document.createElement("p");
  synopsis.classList.add("synopsis");
  synopsis.innerHTML = anime.description;
  const genreContainer = document.createElement("div");
  genreContainer.classList.add("genres");
  createGenreTags(anime, genreContainer, 2, "genre-tag");
  animeDetails.append(canonicalTitle, mediaType, synopsis, genreContainer);
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
  removeChildNodes(queryResultsContainer);

  renderCards(array, section);
}

// creates more cards for anime that matches search term and renders them
export function loadMoreAnime(array, section) {
  renderCards(array, section);
}
// end of anime rendering functions

export function determineTitle(anime) {
  let title = null;
  const titleObject = anime.title;
  if (titleObject.english === null) {
    title = titleObject.romaji;
  } else {
    title = titleObject.english;
  }
  return title;
}

function determineRatingColor(anime) {
  let ratingValue = null;
  const rating = anime.averageScore;
  if (rating === null) {
    ratingValue = 0;
  }
  if (rating <= 50) {
    ratingValue = "poor-avg-rating";
  } else if (rating > 50 && rating < 70) {
    ratingValue = "ok-avg-rating";
  } else if (rating >= 70 && rating < 80) {
    ratingValue = "good-avg-rating";
  } else {
    ratingValue = "great-avg-rating";
  }
  return ratingValue;
}

function determineMediaType(anime) {
  let mediaType = null;
  const showType = anime.format;
  if (showType == "TV") {
    mediaType = "TV Show • ";
  } else if (showType == "MOVIE") {
    mediaType = "Movie • ";
  } else if (showType == "OVA") {
    mediaType = "OVA • ";
  } else if (showType == "ONA") {
    mediaType = "ONA • ";
  } else if (showType == "TV_SHORT") {
    mediaType = "TV Short • ";
  } else {
    mediaType = "Other • ";
  }
  return mediaType;
}

export function determineStatus(anime) {
  let status = null;
  const animeStatus = anime.status;
  if (animeStatus == "RELEASING") {
    status = "Currently Airing";
  } else if (animeStatus == "FINISHED") {
    status = `Finished • ${anime.episodes} episodes `;
  } else if (animeStatus == "NOT_YET_RELEASED") {
    if (anime.startDate.day === null || anime.startDate.month === null || anime.startDate.year === null) {
      status = `Upcoming • ${anime.startDate.year}`;
    } else {
      status = `Upcoming • ${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year}`;
    }
  }
  return status;
}

export function createGenreTags(anime, element, numberOfGenres, _class) {
  const firstTwoGenres = anime.genres.slice(0, numberOfGenres);
  firstTwoGenres.forEach(genre => {
    const genreTag = document.createElement("div");
    genreTag.classList.add(_class);
    genreTag.textContent = genre;
    if (anime.coverImage.color === null) {
      genreTag.style.backgroundColor = "var(--brand-blue-color)";
    }
    genreTag.style.backgroundColor = `${anime.coverImage.color}`;
    element.appendChild(genreTag);
  });
}
