/* eslint-disable no-undef */
'use strict';

// 3rd Party Dependencies
const axios = require('axios');

async function handleGetMovie(request, response){
  let city = request.query.city;

  if (city) {
    let responseMovie = await axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', {
      params: { query: `${city}` },
      headers: {
        accept: 'application.json',
        Authorization: `Bearer ${process.env.THEMOVIEDB_AUTH_TOKEN}`,
      }
    });

    let movieFilter = responseMovie.data.results.map((v) => {
      return new Movies(v);
    });

    response.json(movieFilter);

  } else {
    console.log('Movie api call not working');
  }
}

class Movies {
  constructor(movieData) {
    this.title = movieData.original_title;
    this.description = movieData.overview;
    this.release = movieData.release_date;
  }
}

module.exports = handleGetMovie;
