var express = require('express');
var router = express.Router();

// Array to store song objects
let serverArray = [];

// Constructor function for creating Song objects
let SongObject = function(pTitle, pYear, pGenre, pArtist) {
    // this.ID = pID;
    this.ID = Math.random().toString(16).slice(5)
    this.Title = pTitle;
    this.Year = pYear;
    this.Genre = pGenre;
    this.Artist = pArtist;
}

// Adding sample songs to the songArray
serverArray.push(new SongObject(1, "Seek and Destroy", 1982, "Rock", "Metallica"));
serverArray.push(new SongObject(2, "One", 1988, "Rock", "Metallica"));

console.log(serverArray);

/* Get Home page. */
router.get('/', function(req, res, next){
  res.sendFile('index.html');
});

/* GET song data. */
router.get('/getAllSongs', function(req, res){
  res.status(200).json(serverArray);
});

module.exports = router;
