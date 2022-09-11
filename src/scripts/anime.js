import { renderLpAnime, renderQueriedAnime, loadMoreAnime } from "./card.js";

const mainSearchBar = document.getElementById("query");

let offSetValue = 0;

const DEFAULT_FIELDS = `id
  title {
    romaji
    english
    native
  }
  type
  genres
  startDate {
    year
    month
    day
  }
  endDate {
    year
    month
    day
  }
  season
  seasonYear
  format
  status
  episodes
  trending
  trailer {
    id
    site
  }
  bannerImage
  coverImage {
    extraLarge
    large
    color
  }
  description
  averageScore
  popularity
  duration
  nextAiringEpisode{
    airingAt
    timeUntilAiring
    episode
  }`;

mainSearchBar.addEventListener("input", () => {
  offSetValue = 0;
});

const API_QUERIES_AND_VARIABLES = {
  popularAiring: {
    query: `query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
          ${DEFAULT_FIELDS}
        }
      }
    }
    `,
    variable: {
      page: 1,
      perPage: 6,
    },
  },
  popularUpcoming: {
    query: `query ($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
      }
      media(type: ANIME, status: NOT_YET_RELEASED, sort: POPULARITY_DESC) {
        ${DEFAULT_FIELDS}
      }
    }
  }
  `,
    variable: {
      page: 1,
      perPage: 6,
    },
  },
  allTimePopular: {
    query: `query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, sort: POPULARITY_DESC) {
          ${DEFAULT_FIELDS}
        }
      }
    }
    `,
    variable: {
      page: 1,
      perPage: 6,
    },
  },
  trending: {
    query: `query ($page: Int, $perPage: Int) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(type: ANIME, sort: TRENDING_DESC) {
          ${DEFAULT_FIELDS}
        }
      }
    }
    `,
    variable: {
      page: 1,
      perPage: 6,
    },
  },
};

async function getLpAnime(query, lp_section, variables) {
  let _query = query;

  // Define our query variables and values that will be used in the query request
  let _variables = variables;

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: _query,
        variables: _variables,
      }),
    };

  let response = await fetch(url, options);
  let data = await response.json();

  let results = data.data.Page.media;
  renderLpAnime(results, `${lp_section}`);
}

export async function getPopularAiring() {
  getLpAnime(
    API_QUERIES_AND_VARIABLES.popularAiring.query,
    "popular-airing",
    API_QUERIES_AND_VARIABLES.popularAiring.variable
  );
}

export async function getPopularUpcoming() {
  getLpAnime(
    API_QUERIES_AND_VARIABLES.popularUpcoming.query,
    "popular-upcoming",
    API_QUERIES_AND_VARIABLES.popularUpcoming.variable
  );
}

export async function getAllTimePopular() {
  getLpAnime(
    API_QUERIES_AND_VARIABLES.allTimePopular.query,
    "all-time-popular",
    API_QUERIES_AND_VARIABLES.allTimePopular.variable
  );
}

export async function getTrending() {
  getLpAnime(API_QUERIES_AND_VARIABLES.trending.query, "trending", API_QUERIES_AND_VARIABLES.trending.variable);
}

export async function showQueryResults(pageNum) {
  const query = `
        query ($page: Int, $perPage: Int, $search: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
    }
    media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
      ${DEFAULT_FIELDS}
    }
  }
}
`;

  // Define our query variables and values that will be used in the query request
  let variables = {
    search: mainSearchBar.value,
    page: pageNum,
    perPage: 20,
  };

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  let response = await fetch(url, options);
  let data = await response.json();

  let results = data.data.Page.media;

  renderQueriedAnime(results, "query-results");
}

export async function loadMoreQueryResults(pageNum) {
  const query = `
        query ($page: Int, $perPage: Int, $search: String) {
  Page(page: $page, perPage: $perPage) {
    pageInfo {
      total
      perPage
    }
    media(search: $search, type: ANIME, sort: SEARCH_MATCH) {
      ${DEFAULT_FIELDS}
    }
  }
}
`;

  let variables = {
    search: mainSearchBar.value,
    page: pageNum,
    perPage: 20,
  };

  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  let response = await fetch(url, options);
  let data = await response.json();

  let results = data.data.Page.media;
  loadMoreAnime(results, "query-results");
}
