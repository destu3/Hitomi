import { renderMedia, renderQueriedAnime } from "./dom.js";
import { mainSearchBar } from "./app.js";

export async function getPopularAiring() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=airing&limit=6";
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let popularAiring = results.data;
  renderMedia(popularAiring, "popular-airing");
}

export async function getPopularUpcoming() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=6";
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let popularUpcoming = results.data;
  renderMedia(popularUpcoming, "popular-upcoming");
}

export async function getAllTimePopular() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=6";
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let popularAllTime = results.data;
  renderMedia(popularAllTime, "all-time-popular");
}

export async function showQueryResults() {
  const url = `https://api.jikan.moe/v4/anime?q=${mainSearchBar.value}`;
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let animeResults = results.data;
  renderQueriedAnime(animeResults);
}
