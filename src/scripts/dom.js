import { getPopularAiring, getPopularNextSeason, getAllTimePopular, getTrending } from "./anime.js";
import { determineTitle, determineStatus, createGenreTags } from "./card.js";

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

export function createPopularNextSeason() {
  createLpSection("UPCOMING NEXT SEASON", "popular-next-season", getPopularNextSeason);
}

export function createAllTimePopular() {
  createLpSection("ALL TIME POPULAR", "all-time-popular", getAllTimePopular);
}

export function createTrending() {
  createLpSection("TRENDING NOW", "trending", getTrending);
}

export function removeChildNodes(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

export function showOverlay(anime) {
  // overlay dom selection
  const overlay = document.getElementById("overlay");
  const coverImg = document.getElementById("cover-image");
  const title = document.getElementById("anime-name");
  const origTitle = document.getElementById("orig-title");
  const animeDetails = document.getElementById("anime-details");
  const videoLink = document.getElementById("video-link");
  const watchTrailer = document.getElementById("watch-trailer");
  const animeDescription = document.getElementById("anime-description");
  const genreTagContainer = document.getElementById("genre-tags");
  const startDate = document.getElementById("start-date");
  const endDate = document.getElementById("end-date");
  const episodeDuration = document.getElementById("episode-duration");
  const nextEpisode = document.getElementById("time-until-next-ep");

  if (anime.trailer === null) {
    watchTrailer.style.display = "none";
  } else {
    watchTrailer.style.display = "inline-block";
    videoLink.href = `https://www.youtube.com/watch?v=${anime.trailer.id}`;
    watchTrailer.style.background = anime.coverImage.color;
  }

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

  title.textContent = determineTitle(anime);
  origTitle.textContent = `Original Title: ${anime.title.romaji}`;

  let seasonUPR = anime.season;
  let seasonLWR = seasonUPR.toLowerCase();
  let minusFirstLetter = seasonLWR.substring(1);
  let capitalFirstLetter = seasonLWR[0].toUpperCase();
  const season = capitalFirstLetter + minusFirstLetter;

  animeDetails.textContent = `${anime.format} (${season} ${anime.seasonYear}) • ${determineStatus(anime)}`;
  animeDescription.innerHTML = anime.description;

  removeChildNodes(genreTagContainer);
  createGenreTags(anime, genreTagContainer, anime.genres.length, "more-details-genre-tag");

  let options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const animeStartDate = new Date(anime.startDate.year, anime.startDate.month, anime.startDate.day);
  const animeEndDate = new Date(anime.endDate.year, anime.endDate.month, anime.endDate.day);

  startDate.textContent = animeStartDate.toLocaleString("en-US", options);

  if (anime.endDate.year != null) {
    endDate.textContent = animeEndDate.toLocaleString("en-US", options);
  } else {
    endDate.textContent = "Unknown";
  }

  if (anime.duration != null) {
    episodeDuration.textContent = `${anime.duration} minutes`;
  } else {
    episodeDuration.textContent = "25 minutes (approximately)";
  }

  if (anime.nextAiringEpisode == null && anime.status === "FINISHED") {
    nextEpisode.textContent = "Anime has finished airing";
  } else if (anime.nextAiringEpisode == null) {
    nextEpisode.textContent = "Unknown";
  } else if (anime.nextAiringEpisode != null) {
    nextEpisode.textContent = `Episode ${anime.nextAiringEpisode.episode} airing: ${secondsFormat(
      anime.nextAiringEpisode.timeUntilAiring
    )}`;
  }
}

function secondsFormat(secs) {
  let seconds = parseInt(secs, 10);

  let days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  let hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  let mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;
  return `${days} day(s), ${hrs} Hr(s), ${mnts} Min(s)`;
}
