// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello bhai'});
});

app.get('/api/:date', (req,res) => {
  let date = req.params.date;
  if (!isNaN(Date.parse(date))) {
    let dateobj = new Date(Date.parse(date));
    res.json({
      "unix": Date.parse(date),
      "utc": dateobj.toUTCString()
    })
  }else if ((/\d{5,}/).test(date)) {
    let intdate = parseInt(date);
    let dateobj = new Date(intdate)  
    res.json({
      "unix": date,
      "utc": dateobj.toUTCString()
    })
  }else {
    res.json({
      "error": "invalid url"
    })
  }
})

// listen for requests :)
const port = 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
