import { renderMedia } from "./dom.js";

export async function getFavorite() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=favorite&limit=6";
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let popularAnime = results.data;
  renderMedia(popularAnime, "favorite");
}

export async function getPopularAiring() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=airing&limit=6";
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let popularSeasonal = results.data;
  renderMedia(popularSeasonal, "popular-airing");
}

export async function getPopularUpcoming() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=6";
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let popularSeasonal = results.data;
  renderMedia(popularSeasonal, "popular-upcoming");
}

export async function getAllTimePopular() {
  const url = "https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=6";
  let response = await fetch(url, { mode: "cors" });
  let results = await response.json();

  let popularSeasonal = results.data;
  renderMedia(popularSeasonal, "all-time-popular");
}
