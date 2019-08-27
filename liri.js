
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");


// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create empty variables for holding the movie, song and artist name
let movieName = "";
let songName = "";
let artistName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
if (process.argv[2] === "movie"){

for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];
  }
}

// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log(
        "Title: " + response.data.Title + '\n',
        "Year: " + response.data.Year + '\n',
        "IMDB Rating: " + response.data.imdbRating + '\n',
        "Country: " + response.data.Country + '\n',
        "Language: " + response.data.Language + '\n',
        "Plot: " + response.data.Plot + '\n',
        "Actors: " + response.data.Actors + '\n',
        );
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  })}

  else if (process.argv[2] === "song"){

    for (var i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
          songName = songName + "+" + nodeArgs[i];
        } else {
            songName += nodeArgs[i];
        }
      }
    console.log(songName)

    var Spotify = require('node-spotify-api');

      var spotify = new Spotify({
      id: "67c9837325db41789aef23ccf82794cc",
      secret: "a8827e790c7e40a8b3375f14eab033d7",
})

      spotify.search({ type: 'track', query: songName }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          }
        //   console.log(data.tracks)
        //   for (var key in data.tracks) {
        //       console.log( data.tracks.items[0].name)
        //   }

        data.tracks.items.map( function (track){
            console.log('============')
            console.log(track.artists[0].name)
            console.log(track.name)
            console.log(track.artists[0].href)
            console.log(track.album.name)
            console.log('============')
            
        } ); 
});  

  }

else if (process.argv[2] === "concert"){
  for (var i = 3; i < nodeArgs.length; i++) {

      if (i > 3 && i < nodeArgs.length) {
        artistName = artistName + " " + nodeArgs[i];
      } else {
        artistName += nodeArgs[i];
      }
    }
    console.log(artistName);

  var query = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";

  axios.get(query).then(
      function(response) {
        console.log(response.data[0].venue.name);
        console.log(response.data[0].venue.city);
        console.log(response.data[0].venue.region);
        console.log(response.data[0].datetime)
      })
 }

  else {
      console.log("Please enter valid LIRI type")
  }

