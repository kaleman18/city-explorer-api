/* eslint-disable no-undef */
'use strict';

// 3rd Party Dependencies
const axios = require('axios');


// Data Filters
class Forcast {
  constructor(weather) {
    this.weather = weather.data;
  }
}

async function handleGetWeather(request, response){
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
}

module.exports = handleGetWeather;
