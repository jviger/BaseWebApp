var express = require('express');

var request = require('request');
const bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname));

// views is directory for all template files
app.set('views', __dirname + '/html');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/about', function(request, response) {
  response.render('pages/about');
});

app.get('/projects', function(request, response) {
  response.render('pages/projects');
});

app.post('/webhook', function(request, response) {
  var body = request;
  console.log(body);
  response.render('pages/index');
});
app.get('/webhook', function(request, response) {
  var body = request;
  console.log(body);
   response.render('pages/index');
});
//app.get('/weather', function(request, response) {
//  response.render('pages/weather');
//});


app.get('/weather', (req, res) => {
	let loc = req.query.q;
	let dapi = req.query.a;
	
  request(
    { url: 'https://api.darksky.net/forecast/'+dapi+'/'+loc },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: 'error' });
      }

      res.json(JSON.parse(body));
    }
  )
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


// This file is what handles incoming requests and
// serves files to the browser, or executes server-side code
