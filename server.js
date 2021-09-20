'use strict';

// Using express library--------------------//
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const weatherData = require('./data/Weather.json')

const PORT = process.env.PORT;
server.use(cors());

class Forcast{
    constructor(date, description){
        this.date = date;
        this.description = description;
    }
}

// localhost:3001/
server.get('/',(req,res)=>{
    res.status(200).send('home route')
})

// localhost:3001/test
server.get('/test',(req,res)=>{
    res.send('API Server: Active')
})

// localhost:3001/weather?city=Seattle
server.get('/weather',(req,res)=>{
try{
    let cityName = req.query.city;
    // console.log(req.query);
    // console.log(cityName);
    let forcastObjects = [];
    let watherInfo = weatherData.find((item)=>{
        if(item.city_name === cityName) {
            forcastObjects = item.data.map(itemD => new Forcast(itemD.datetime, itemD.weather.description)); 
            return item;
        }
    })
    res.send({"weatherData": forcastObjects, "city": watherInfo.city_name, "lan": watherInfo.lat, "lon": watherInfo.lon});
} catch {
    throw new Error('status code 500');
    res.status(500);
}
    


})

// localhost:3005/ANYTHING
server.get('*',(req,res)=>{
    res.status(404).send('route is not found')
})

server.listen(PORT,()=>{
    console.log(`Listening on PORT ${PORT}`)
})

