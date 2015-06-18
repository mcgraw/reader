var express      = require('express');
var app          = express();                   // Framework to handle routing requests
var mongoose     = require('mongoose');      	// MongoDB modeling tool 

var path         = require('path');         	// Utilities for handling and transforming file paths
var logger       = require('winston');        	// HTTP request logger
var cookieParser = require('cookie-parser'); 	// Populates req.cookies with an object keyed
var bodyParser   = require('body-parser');   	// https://www.npmjs.com/package/body-parser
var favicon      = require('serve-favicon'); 	// Serves and caches a favicon

var config       = require('./config');			// Shared configuration items
var routes       = require('./routes');      	// Routes for our application   

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
var dbUrl = config.db_path[app.settings.env];
var connection = mongoose.createConnection(dbUrl);

connection.on('error', console.error.bind(console, 'Connection error:'));
connection.once('open', function() {
	console.info("Connected to database: " + dbUrl);
	
	// Setup database middleware
	var sessions = require('./models/sessions');
	var users = require('./models/users');
	var articles = require('./models/articles');
	var sections = require('./models/sections');
	function schemaMiddleware(req, res, next) {
		req.db = {
			User: connection.model('User', users.User, 'users'),
			Article: connection.model('Article', articles.Article, 'articles'),
			Section: connection.model('Section', sections.Section, 'sections'),
			Session: connection.model('Session', sessions.Session, 'sessions')
		};
		return next();
	}
	
	// Application routes
	routes(app, schemaMiddleware);
	
	// Start express server
	app.listen(8080);
	console.log('Express server listening on port 8080');
});

module.exports = app;