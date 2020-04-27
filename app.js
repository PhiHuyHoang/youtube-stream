const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

const app = express();
app.use('/static', express.static('./static'));

var port = process.env.PORT || 8000


app.listen(port, () => { 
    console.log("It Works!");
});

app.get('/', function(req, res) {
    var url = 'https://www.youtube.com/watch?v=GgcHlZsOgQo';
  var video = ytdl(url)

  res.set({
      "Content-Type": "audio/mpeg"
  })

  new ffmpeg({source: video})
      .toFormat('mp3')
      .writeToStream(res, function(data, err) {
        if (err) console.log(err)
      })

});