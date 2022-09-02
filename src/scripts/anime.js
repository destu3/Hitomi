import { renderLpAnime, renderQueriedAnime } from "./dom.js";
import { mainSearchBar } from "./app.js";

async function getLpAnime(endpoint, lp_section) {
  const url = endpoint;
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let data = results.data;
  renderLpAnime(data, `${lp_section}`);
}

export async function getPopularAiring() {
  getLpAnime("https://api.jikan.moe/v4/top/anime?filter=airing&limit=6", "popular-airing");
}

export async function getPopularUpcoming() {
  getLpAnime("https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=6", "popular-upcoming");
}

export async function getAllTimePopular() {
  getLpAnime("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=6", "all-time-popular");
}

export async function showQueryResults() {
  const url = `https://api.jikan.moe/v4/anime?q=${mainSearchBar.value}`;
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let animeResults = results.data;
  renderQueriedAnime(animeResults);
}
