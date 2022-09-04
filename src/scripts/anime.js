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
  getLpAnime(
    "https://kitsu.io/api/edge/anime?filter[status]=current&sort=popularityRank&page[limit]=6",
    "popular-airing"
  );
}

export async function getPopularUpcoming() {
  getLpAnime(
    "https://kitsu.io/api/edge/anime?filter[status]=upcoming&sort=popularityRank&page[limit]=6",
    "popular-upcoming"
  );
}

export async function getAllTimePopular() {
  getLpAnime("https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=12", "all-time-popular");
}

export async function getTrending() {
  getLpAnime("https://kitsu.io/api/edge/trending/anime?page[limit]=5&page[offset]=0", "trending");
}

export async function showQueryResults() {
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${mainSearchBar.value}&page[limit]=20`;
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let animeResults = results.data;
  renderQueriedAnime(animeResults);
}
