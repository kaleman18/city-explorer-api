/* eslint-disable no-undef */
'use strict';

require("dotenv").config();

// 3rd Party Dependencies
const express = require("express");
const cors = require("cors");

// Initialize my express application
const app = express();

// Activate "cors" or "Middleware"
app.use(cors());

// Internal Dependencies
const handleGetWeather = require('./Handlers/weather');
const handleGetMovie = require('./Handlers/movie');


app.listen(process.env.PORT);

// Route Handlers
app.get('/weather', handleGetWeather);
app.get('/movie', handleGetMovie);
app.get("*", (request, response) => {
  response.status(404).send("Not Found");
});



