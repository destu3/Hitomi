import { clearAnime } from "./dom.js";

// anime rendering functions
export function renderLpAnime(array, lp_section) {
  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("a");
    title.href = `https://kitsu.io/anime/${anime.attributes.slug}`;
    title.target = "_target";
    title.classList.add("title");
    poster.src = anime.attributes.posterImage.large;

    // anime details
    const animeDetails = document.createElement("div");
    animeDetails.classList.add("speech-bubble", "anime-details");
    const canonicalTitle = document.createElement("p");
    canonicalTitle.classList.add("canonical-title");
    canonicalTitle.textContent = anime.attributes.canonicalTitle;
    const averageRating = document.createElement("p");
    averageRating.classList.add("average-rating");
    if (anime.attributes.averageRating <= 50) {
      averageRating.classList.add("poor-avg-rating");
    } else if (anime.attributes.averageRating > 50 && anime.attributes.averageRating < 70) {
      averageRating.classList.add("ok-avg-rating");
    } else if (anime.attributes.averageRating >= 70 && anime.attributes.averageRating < 80) {
      averageRating.classList.add("good-avg-rating");
    } else {
      averageRating.classList.add("great-avg-rating");
    }
    averageRating.textContent = `${String(Math.round(anime.attributes.averageRating))}%`;
    const mediaType = document.createElement("p");
    mediaType.classList.add("media-type");
    if (anime.attributes.showType == "TV") {
      mediaType.textContent = "TV Show • ";
    } else if (anime.attributes.showType == "movie") {
      mediaType.textContent = "Movie • ";
    } else if (anime.attributes.showType == "OVA") {
      mediaType.textContent = "OVA • ";
    } else if (anime.attributes.showType == "ONA") {
      mediaType.textContent = "ONA • ";
    }
    const animeStatus = document.createElement("span");
    animeStatus.classList.add("status");
    if (anime.attributes.status == "current") {
      animeStatus.textContent = "Currently Airing";
    } else if (anime.attributes.status == "finished") {
      animeStatus.textContent = `Finished • ${anime.attributes.episodeCount} episodes `;
    } else if ((animeStatus.textContent = "upcoming")) {
      animeStatus.textContent = `Upcoming • ${anime.attributes.startDate} `;
    }
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

    const titlesObject = anime.attributes.titles;
    if (titlesObject.hasOwnProperty("en")) {
      title.textContent = titlesObject.en;
    } else if (titlesObject.hasOwnProperty("en_us")) {
      title.textContent = titlesObject.en_us;
    } else {
      title.textContent = anime.attributes.canonicalTitle;
    }

    animeCard.append(poster, title, animeDetails);
    const landingSectMedia = document.querySelector(`.${lp_section}`);
    landingSectMedia.appendChild(animeCard);
  });
}

// creates cards for anime that match search term and renders them
export function renderQueriedAnime(array) {
  const queryResultsContainer = document.querySelector(".query-results");
  queryResultsContainer.classList.add("visible");
  clearAnime(queryResultsContainer);

  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("a");
    title.href = `https://kitsu.io/anime/${anime.attributes.slug}`;
    title.target = "_target";
    title.classList.add("title");
    poster.src = anime.attributes.posterImage.large;

    // anime details
    const animeDetails = document.createElement("div");
    animeDetails.classList.add("speech-bubble", "anime-details");
    const canonicalTitle = document.createElement("p");
    canonicalTitle.classList.add("canonical-title");
    canonicalTitle.textContent = anime.attributes.canonicalTitle;
    const averageRating = document.createElement("p");
    averageRating.classList.add("average-rating");
    const roundedRating = Math.round(anime.attributes.averageRating);
    if (roundedRating <= 50) {
      averageRating.classList.add("poor-avg-rating");
    } else if (roundedRating > 50 && roundedRating < 70) {
      averageRating.classList.add("ok-avg-rating");
    } else if (roundedRating >= 70 && roundedRating < 80) {
      averageRating.classList.add("good-avg-rating");
    } else {
      averageRating.classList.add("great-avg-rating");
    }
    averageRating.textContent = `${String(Math.round(roundedRating))}%`;
    const mediaType = document.createElement("p");
    mediaType.classList.add("media-type");
    if (anime.attributes.showType == "TV") {
      mediaType.textContent = "TV Show • ";
    } else if (anime.attributes.showType == "movie") {
      mediaType.textContent = "Movie • ";
    } else if (anime.attributes.showType == "OVA") {
      mediaType.textContent = "OVA • ";
    } else if (anime.attributes.showType == "ONA") {
      mediaType.textContent = "ONA • ";
    }
    const animeStatus = document.createElement("span");
    animeStatus.classList.add("status");
    if (anime.attributes.status == "current") {
      animeStatus.textContent = "Currently Airing";
    } else if (anime.attributes.status == "finished") {
      animeStatus.textContent = `Finished • ${anime.attributes.episodeCount} episodes `;
    } else if ((animeStatus.textContent = "upcoming")) {
      animeStatus.textContent = `Upcoming • ${anime.attributes.startDate} `;
    }
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

// creates more cards for anime that matches search term and renders them
export function loadMoreAnime(array) {
  const queryResultsContainer = document.querySelector(".query-results");
  queryResultsContainer.classList.add("visible");

  array.forEach(anime => {
    const animeCard = document.createElement("div");
    animeCard.classList.add("anime-card");
    const poster = document.createElement("img");
    poster.classList.add("poster");
    const title = document.createElement("a");
    title.href = `https://kitsu.io/anime/${anime.attributes.slug}`;
    title.target = "_target";
    title.classList.add("title");
    poster.src = anime.attributes.posterImage.large;

    // anime details
    const animeDetails = document.createElement("div");
    animeDetails.classList.add("speech-bubble", "anime-details");
    const canonicalTitle = document.createElement("p");
    canonicalTitle.classList.add("canonical-title");
    canonicalTitle.textContent = anime.attributes.canonicalTitle;
    const averageRating = document.createElement("p");
    averageRating.classList.add("average-rating");
    if (anime.attributes.averageRating <= 50) {
      averageRating.classList.add("poor-avg-rating");
    } else if (anime.attributes.averageRating > 50 && anime.attributes.averageRating < 70) {
      averageRating.classList.add("ok-avg-rating");
    } else if (anime.attributes.averageRating >= 70 && anime.attributes.averageRating < 80) {
      averageRating.classList.add("good-avg-rating");
    } else {
      averageRating.classList.add("great-avg-rating");
    }
    averageRating.textContent = `${String(Math.round(anime.attributes.averageRating))}%`;
    const mediaType = document.createElement("p");
    mediaType.classList.add("media-type");
    if (anime.attributes.showType == "TV") {
      mediaType.textContent = "TV Show • ";
    } else if (anime.attributes.showType == "movie") {
      mediaType.textContent = "Movie • ";
    } else if (anime.attributes.showType == "OVA") {
      mediaType.textContent = "OVA • ";
    } else if (anime.attributes.showType == "ONA") {
      mediaType.textContent = "ONA • ";
    }
    const animeStatus = document.createElement("span");
    animeStatus.classList.add("status");
    if (anime.attributes.status == "current") {
      animeStatus.textContent = "Currently Airing";
    } else if (anime.attributes.status == "finished") {
      animeStatus.textContent = `Finished • ${anime.attributes.episodeCount} episodes `;
    } else if ((animeStatus.textContent = "upcoming")) {
      animeStatus.textContent = `Upcoming • ${anime.attributes.startDate} `;
    }
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
// end of anime rendering functions
