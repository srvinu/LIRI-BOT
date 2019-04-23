require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var axios = require("axios");
var bandsintown = require("bandsintown-rest")('codingbootcamp')
var eventlogs;
var moment = require("moment");
var usrCmd = process.argv[2]
var usrInput = process.argv[3]

function movieSearch(movieName){
  axios.get("http://www.omdbapi.com/?t="+movieName+"&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Released Year : "+ response.data.Year);
    console.log("IMDB Rating: "+response.data.imdbRating);
    if(response.data.Ratings[1] !== undefined){
      console.log("Rotten Tomatoes Rating: "+response.data.Ratings[1].Value);
      var RT = "Rotten Tomatoes Rating: "+response.data.Ratings[1].Value
    } else {console.log("Rotten Tomatoes Rating: Not Available")
      var RT = "Rotten Tomatoes Rating: Not Available"
    }
    console.log("Country : "+response.data.Country);
    console.log("Plot of the Movie : "+response.data.Plot);
    console.log("Actors  : "+response.data.Actors);
    eventlogs = "\n\n======Movie Search Event Triggered @ "+moment().format('MM/DD/YYYY HH:mm:ss')+"======"
    fs.appendFile("output.log", eventlogs+"\nTitle: " + response.data.Title+ "\nReleased Year : "+ response.data.Year+ "\nIMDB Rating: "+response.data.imdbRating+ "\n"+ RT+ "\nCountry : "+response.data.Country+ "\nActors  : "+response.data.Actors,  function(err) {
      if (err) {console.log(err)} else {console.log("Log File Updated!")}
    });
  });
};

// movieSearch("remember the titans")

function spotifySearch(songName){
  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  // console.log(data);
  console.log("Artist : " + data.tracks.items[0].artists[0].name);
  console.log("Song Name : " + data.tracks.items[0].name);
  console.log("Preview Link : " + data.tracks.items[0].preview_url);
  console.log("Album Name : " + data.tracks.items[0].album.name);
  eventlogs = "\n\n======Spotify Event Triggered @ "+moment().format('MM/DD/YYYY HH:mm:ss')+"======"
  fs.appendFile("output.log", eventlogs+"\nArtist : " + data.tracks.items[0].artists[0].name+ "\nSong Name : " + data.tracks.items[0].name+ "\nPreview Link : " + data.tracks.items[0].preview_url+ "\nAlbum Name : " + data.tracks.items[0].album.name,  function(err) {
    if (err) {console.log(err)} else {console.log("Log File Updated!")}
  });
  });
}
// spotifySearch("The Sign by Ace of Base");

function bandSearch (bandName){
bandsintown
  .getArtistEventList(bandName)
  .then(function(events) {
    // console.log(events)
    if( events.length === 0 || events[0].venue === undefined ){
      console.log("Sorry ! Band / Concert not found.")
      eventlogs = "\n\n======BandinTown Triggered @ "+moment().format('MM/DD/YYYY HH:mm:ss')+"======"
      fs.appendFile("output.log", eventlogs+"\nSorry ! Band / Concert not found.",  function(err) {
        if (err) {console.log(err)} else {console.log("Log File Updated!")}
      });
    } else{
    console.log("Name of the Venue: "+events[0].venue.name)
    console.log("Location: "+events[0].venue.city+", "+events[0].venue.region+", "+events[0].venue.country)
    console.log("Date of the Event: "+moment(events[0].datetime).format('MM/DD/YYYY'));
    eventlogs = "\n\n======BandinTown Triggered @ "+moment().format('MM/DD/YYYY HH:mm:ss')+"======"
    fs.appendFile("output.log", eventlogs+"\nName of the Venue: "+events[0].venue.name+ "\nLocation: "+events[0].venue.city+", "+events[0].venue.region+", "+events[0].venue.country+ "\nDate of the Event: "+moment(events[0].datetime).format('MM/DD/YYYY'),  function(err) {
      if (err) {console.log(err)} else {console.log("Log File Updated!")}
    });
    }
  });
}

// bandSearch("the who")
function doWhatItSays(){
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    spotifySearch(dataArr[1])
  });
}
// doWhatItSays()
///Main Functions

if (usrCmd === "concert-this"){
  if(usrInput != undefined){
    bandSearch(usrInput)
  } else{bandSearch("the who")}
}
if (usrCmd === "spotify-this-song"){
  if(usrInput != undefined){
    spotifySearch(usrInput)
  } else{spotifySearch("The Sign by Ace of Base")}
}
if (usrCmd === "movie-this"){
  if(usrInput != undefined){
    movieSearch(usrInput)
  } else{movieSearch("Mr. Nobody")}
}
if (usrCmd === "do-what-it-says"){
  doWhatItSays()
}
if (usrCmd !== "do-what-it-says" && usrCmd !== "movie-this" && usrCmd !== "spotify-this-song" && usrCmd !== "concert-this"){
  console.log("ERROR: Invalid input ! Please use below options: \n   node liri.js concert-this <artist/band name here>\n   node liri.js spotify-this-song <song name here>\n   node liri.js movie-this <movie name here>\n   node liri.js do-what-it-says ")
}





// else if (usrCmd === "spotify-this-song"){spotifySearch(usrInput)}
// else if (usrCmd === "movie-this"){movieSearch(usrInput)}
// else if (usrCmd === "movie-this"){movieSearch(usrInput)}
