var express      = require('express');
var app          = express();                   // Framework to handle routing requests
var mongoose     = require('mongoose');      // MongoDB modeling tool 

var path         = require('path');          // Utilities for handling and transforming file paths
var logger       = require('winston');        // HTTP request logger
var cookieParser = require('cookie-parser'); // Populates req.cookies with an object keyed
var bodyParser   = require('body-parser');   // https://www.npmjs.com/package/body-parser
var favicon      = require('serve-favicon'); // Serves and caches a favicon

var routes       = require('./routes');      // Routes for our application   

// Register templating engine
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Express middleware to populate 'req.cookies' so we can access cookies
app.use(cookieParser());

// Express middleware to populate 'req.body' so we can access POST variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Expose public directory for thefront-end client
app.use(express.static(path.join(__dirname, 'public')));

// Create a connection to our database 
var dbUrl = 'mongodb://127.0.0.1:27017/reader';
var connection = mongoose.createConnection(dbUrl);

connection.on('error', console.error.bind(console, 'Connection error:'));
connection.once('open', function() {
	console.info("Connected to database: " + dbUrl);
	
	// Setup database middleware
	var users = require('./models/users');
	var articles = require('./models/articles');
	function db(req, res, next) {
		req.db = {
			User: connection.model('User', users.User, 'users'),
			Article: connection.model('Article', articles.Article, 'articles')
		};
		return next();
	}
	
	// Application routes
	routes(app, db);
	
	// Start express server
	app.listen(8080);
	console.log('Express server listening on port 8080');
});

module.exports = app;