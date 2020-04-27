const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

const app = express();
app.use('/static', express.static('./static'));

app.listen(3000, () => { 
    console.log("It Works!");
});

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