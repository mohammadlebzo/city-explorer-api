'use strict';

// Using express library--------------------//
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

let axios = require('axios')

const PORT = process.env.PORT;
server.use(cors());

// Classes------------------------------------//
class Forcast{
    constructor(description, date){
        this.description = description;
        this.date = date;
    }
}
class movie{
    constructor(title, overview, average_votes, total_votes, image_url, popularity, released_on){
        this.title = title;
        this.overview = overview;
        this.average_votes = average_votes;
        this.total_votes = total_votes;
        this.image_url = image_url;
        this.popularity = popularity;
        this.released_on = released_on;
    }
}
// Routes--------------------------------------//

server.get('/',homeRoute);
server.get('/test',testRoute);
server.get('/weather',weatherRoute);
server.get('/movies',moviesRoute);
server.get('*',anythingRout);
    
// Functions--------------------------------------//

// localhost:3001/
function homeRoute (req,res) {res.status(200).send('home route')};

// localhost:3001/test
function testRoute (req,res) {res.send('API Server: Active')};

// localhost:3001/weather?city=
async function weatherRoute (req,res) {
    
    let cityName = req.query.city;
    let forcastObjects = [];

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityName}`;

    await axios.get(weatherURL).then(result => {
        let daysWeatherArray = result.data.data.slice(0,6);
        // description, date
        daysWeatherArray.forEach(element => forcastObjects.push(new Forcast(element.weather.description, element.datetime)));
        res.send({'weatherData': forcastObjects, 'city': result.data.city_name, 'lon': result.data.lon, 'lat': result.data.lat});
    }).catch(error => {
        console.log(error);
    });
};

// localhost:3001/movies?query=
async function moviesRoute (req,res) {
    
    let movieName = req.query.query;
    let movieObjects = [];

    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${movieName}`

    await axios.get(movieURL).then(result => {
        let imgURLStart = 'https://image.tmdb.org/t/p/w500';
        // title, overview, average_votes, total_votes, image_url, popularity, released_on
        result.data.results.forEach(element => movieObjects.push(new movie(element.title, element.overview, element.vote_average, element.vote_count, imgURLStart + element.poster_path, element.popularity, element.release_date)));
        res.send(movieObjects);
    }).catch(error => {
        console.log(error);
        res.status(500);
    });
};

// localhost:3005/ANYTHING
function anythingRout (req,res) {res.status(404).send('route is not found')};


// Listener------------------------------------------------------------//
server.listen(PORT,()=>{console.log(`Listening on PORT ${PORT}`)})

