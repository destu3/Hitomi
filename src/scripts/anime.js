import { renderLpAnime, renderQueriedAnime, loadMoreAnime } from "./dom.js";

const mainSearchBar = document.getElementById("query");

let offSetValue = 0;

mainSearchBar.addEventListener("input", () => {
  offSetValue = 0;
});

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
  getLpAnime("https://kitsu.io/api/edge/trending/anime", "trending");
}

export async function showQueryResults() {
  const url = `https://kitsu.io/api/edge/anime?filter[text]=${mainSearchBar.value}&page[limit]=20`;
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let animeResults = results.data;

  renderQueriedAnime(animeResults);
}

export async function loadMoreQueryResults() {
  offSetValue += 20;

  try {
    let url = `https://kitsu.io/api/edge/anime?filter%5Btext%5D=${mainSearchBar.value}&page%5Blimit%5D=20&page%5Boffset%5D=${offSetValue}`;
    const response = await fetch(url, { mode: "cors" });
    const result = await response.json();

    const moreMedia = result.data;
    loadMoreAnime(moreMedia);
  } catch (error) {
    console.log(`error occured: ${error}`);
  }
}
