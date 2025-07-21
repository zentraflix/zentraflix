window.__CONFIG__ = {
  // The URL for the CORS proxy, the URL must NOT end with a slash!
  // If not specified, the onboarding will not allow a "default setup". The user will have to use the extension or set up a proxy themselves
  VITE_CORS_PROXY_URL: "https://simple-proxy-zentraflix.choudharyji0604.workers.dev",

  // The READ API key to access TMDB
  VITE_TMDB_READ_API_KEY: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNGI0MDFjYzIxNzgyZWUwZmU0NTg2NGY5ZDJkNTlkMyIsIm5iZiI6MTc1MjY0MjI4OS40MDQsInN1YiI6IjY4NzczMmYxYzJjN2U1MzgzMDE2NWYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9PcnkWK61xeXXF9h1-SI0eYeoGMfLZHiePfzdtSSYn4",

  // The DMCA email displayed in the footer, null to hide the DMCA link
  VITE_DMCA_EMAIL: null,

  // Whether to disable hash-based routing, leave this as false if you don't know what this is
  VITE_NORMAL_ROUTER: true,

  // The backend URL to communicate with
  VITE_BACKEND_URL: "https://server.fifthwit.net",

  // A comma separated list of disallowed IDs in the case of a DMCA claim - in the format "series-<id>" and "movie-<id>"
  VITE_DISALLOWED_IDS: ""

  // The m3u8 URL to use for the default setup, the url must NOT end with a slash!
  VITE_M3U8_PROXY_URL: "https://simple-proxy-zentraflix.choudharyji0604.workers.dev",
};
