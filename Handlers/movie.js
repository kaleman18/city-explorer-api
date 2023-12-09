/* eslint-disable no-undef */
'use strict';

// 3rd Party Dependencies
const axios = require('axios');

// Storage
let cache = {
//   seattle: {
//     movies: [{}],
//     timestamp:
//   }
};

async function handleGetMovie(request, response){

  let city = request.query.city;

  if (! cache[city] || (Date.now() - cache[city].timestamp > 50000)) {
    // API call
    let responseMovie = await axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', {
      params: { query: `${city}` },
      headers: {
        accept: 'application.json',
        Authorization: `Bearer ${process.env.THEMOVIEDB_AUTH_TOKEN}`,
      }
    });
    // maps over data and makes filtered objects
    let movieFilter = responseMovie.data.results.map((v) => {
      return new Movies(v);
    });

    cache[city] = {};
    // stores in cache
    cache[city].movies= movieFilter;
    // adds a timestamp to our cache
    cache[city].timestamp = Date.now();

    console.log('adding city to cache');
  } else {
    console.log(`${city} is in cache`);
    
  }
  // sends back to front end
  response.json(cache[city]);
}

class Movies {
  constructor(movieData) {
    this.title = movieData.original_title;
    this.description = movieData.overview;
    this.release = movieData.release_date;
  }
}

module.exports = handleGetMovie;
