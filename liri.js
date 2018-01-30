var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
let firstInput = process.argv[2];
let secondInput = process.argv[3];
////////////////Twitter////////////////
var client = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
});
var paramsTwit = {
    screen_name: secondInput,
    count: 10
};
////////////////Spotify////////////////
var spotify = new Spotify({
    id: keys.spotifyKeys.id,
    secret: keys.spotifyKeys.secret,
});

if (firstInput === "my-tweets") {
    client.get('statuses/user_timeline', paramsTwit, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(' ');
                console.log(tweets[i].text);
            }
        } else {
            console.log("TWEET ERROR!")
        }
    });
} else if (firstInput === 'spotify-this-song') {
    spotify.search({
        type: 'track',
        query: (secondInput || "Ace of Base The Sign"),
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var getArtistNames = function (artist) {
            return artist.name
        }
        var songs = data.tracks.items;
        for (var i = 0; i < songs.length; i++) {
            console.log([i]);
            console.log("Artist: " + songs[i].artists.map(getArtistNames));
            console.log("Song: " + songs[i].name);
            console.log("Album: " + songs[i].album.name);
            console.log("Song URL: " + songs[i].preview_url);
            console.log("----------------------------------------------")
        }
    });
} else if (firstInput === "movie-this") {
    movieName = secondInput || "Mr. Nobody";

    var qURL = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;
    console.log(qURL);

    request(qURL, function (error, response, body) {
        if (error) {
            return console.log("Error occurred: " + error);
        } else {
            let jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("IMBD Rating: " + jsonData.Rated);
            console.log("Rotten Tomatos Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.tomatoRating);
            console.log("Rotten Tomatoes URL: " + jsonData.tomatoURL);
        }
    });
} else if (firstInput === "do-what-it-says") {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    });
} else {
    console.log("liri don't do that")
}