const axios = require('axios'); 
// const { query } = require('express');

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

module.exports = moviesRoute;