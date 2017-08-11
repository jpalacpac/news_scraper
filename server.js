var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var handlebars = require('express-handlebars');
var methodOverride = require('method-override');

mongoose.Promise = Promise;

var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(methodOverride('_method'));

mongoose.connect('');
var db = mongoose.connection;

db.on('error', function(error) {
  console.log('Mongoose Error: ', error);
});

db.once('open', function() {
  console.log('Mongoose connection successful.');
});

app.listen(PORT, function() {
  console.log('App running on port ' + PORT);
});

require('./controllers/routes.js')(app);