'use strict';

// Using express library--------------------//
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const server = express();

const axios = require('axios')

// Modules---------------------------------------//
const weatherRoute = require('./Modules/weather');
const moviesRoute = require('./Modules/movies');

const PORT = process.env.PORT;
server.use(cors());

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


// localhost:3005/ANYTHING
function anythingRout (req,res) {res.status(404).send('route is not found')};


// Listener------------------------------------------------------------//
server.listen(PORT,()=>{console.log(`Listening on PORT ${PORT}`)})

