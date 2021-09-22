const axios = require('axios'); 

class Forcast{
    constructor(description, date){
        this.description = description;
        this.date = date;
    }
}

// localhost:3001/weather?city=
function weatherRoute (req,res) {
    
    let cityName = req.query.city;
    let forcastObjects = [];

    let weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityName}`;

    axios.get(weatherURL).then(result => {
        let daysWeatherArray = result.data.data.slice(0,6);
        // description, date
        daysWeatherArray.forEach(element => forcastObjects.push(new Forcast(element.weather.description, element.datetime)));
        res.send({'weatherData': forcastObjects, 'city': result.data.city_name, 'lon': result.data.lon, 'lat': result.data.lat});
    }).catch(error => {
        console.log(error);
    });
};

module.exports = weatherRoute;