var express = require('express');
var router = express.Router();
var ytdl = require('ytdl');
var ffmpeg = require('fluent-ffmpeg');

router.get('/', function(req, res) {
    var url = 'https://www.youtube.com/watch?v=GgcHlZsOgQo';
  
    // Audio format header (OPTIONAL)
    res.set({ "Content-Type": "audio/mpeg" });
  
    // Send compressed audio mp3 data
    ffmpeg()
    .input(ytdl(url))
    .toFormat('mp3')
    .pipe(res);
  });

module.exports = router;