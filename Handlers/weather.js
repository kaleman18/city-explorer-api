/* eslint-disable no-undef */
'use strict';

// 3rd Party Dependencies
const axios = require('axios');

// Storage
let cache = {};


// Data Filters
class Forcast {
  constructor(weather) {
    this.weather = weather.data;
  }
}

async function handleGetWeather(request, response){
  let lat = request.query.latitude;
  let lon = request.query.longitude;

  if (! cache[lat,lon] || (Date.now() - cache[lat,lon].timestamp > 50000)) {
    let cityWeather = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily`, {
      params: {
        key: process.env.WEATHERBIT_API_KEY,
        days: 7,
        lat: lat,
        lon: lon,
      }
    });
    
    let newForcast = new Forcast(cityWeather.data);

    cache[lat,lon] = {};
    cache[lat,lon].timestamp= Date.now();
    cache[lat,lon].forcast= newForcast;
    console.log('adding weather to cache');
    
  } else {
    console.log('weather is in cache');
  }
  response.json(cache[lat,lon].forcast);
}

module.exports = handleGetWeather;
