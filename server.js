/* eslint-disable no-undef */
'use strict';


// Use a library called "dotenv" to "read" my .env file
// And put all of the "key/value" pairs into an object called process.env
require("dotenv").config();

// Bring in the "express" library 
const express = require("express");

// Bring in the "cors" library to let us have more open access to the server
const cors = require("cors");

const axios = require('axios');

// Initialize my express application
const app = express();

// Activate "cors"
app.use(cors());

// Should be in the "enviornment"
const PORT = process.env.PORT;


app.listen(PORT, () => console.log(`running on ${PORT}`));

class Forcast {
  constructor(weather) {
    this.weather = weather.data;
    // this.description = weather.data.weather.description;
  }
}

app.get('/weather', async (request, response) => {
  let lat = request.query.latitude;
  let lon = request.query.longitude;
  if (lat && lon) {
    let cityWeather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily`, {
      params: {
        key: process.env.WEATHERBIT_API_KEY,
        days: 7,
        lat: lat,
        lon: lon,
      }
    });
    let newForcast = new Forcast(cityWeather.data);

    response.json(newForcast);
  } else console.log('Server didnt work');
});

app.get('/movie', async (request, response) => {
  let city = request.query.city;

  if (city) {
    let responseMovie = await axios.get('https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1', {
      params: { query: `${city}` },
      headers: {
        accept: 'application.json',
        Authorization: `Bearer ${process.env.THEMOVIEDB_AUTH_TOKEN}`,
      }
    });
    console.log(responseMovie.data);
    response.json(responseMovie.data);
  } else {
    console.log('Movie api call not working');
  }
});
// class Movies {
//   constructor(movieData) {
//     this.title = movieData.data;
    
//   }
// }


app.get("*", (request, response) => {
  response.status(404).send("Not Found");
});



