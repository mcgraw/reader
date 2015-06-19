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

// Setup the connection to the database
var db_server = app.settings.env;

mongoose.connection.on('connected', function(ref) {
	console.log("Connected to " + db_server + " DB!");
	
	// Setup database middleware
	var sessions = require('./models/sessions');
	var users = require('./models/users');
	var articles = require('./models/articles');
	var sections = require('./models/sections');
	var blocks = require('./models/blocks');
	function schemaMiddleware(req, res, next) {
		req.db = {
			Session: mongoose.connection.model('Session', sessions.Session, 'sessions'),
			User: mongoose.connection.model('User', users.User, 'users'),
			Article: mongoose.connection.model('Article', articles.Article, 'articles'),
			Section: mongoose.connection.model('Section', sections.Section, 'sections'),
			Session: mongoose.connection.model('Session', sessions.Session, 'sessions'),
			Block: mongoose.connection.model('Block', blocks.Block, 'blocks')
		};
		return next();
	}
	
	// Application routes
	routes(app, schemaMiddleware);
	
	// Start express server
	app.listen(8080, function() {
		console.log('Express server listening on port 8080');
	});	
});

// Connection throws an error
mongoose.connection.on('error', function(err) {
	console.error('Failed to connect to DB ' + db_server + ' on startup', err);
});

// Connection is disconnected
mongoose.connection.on('disconnected', function(err) {
	console.error('Mongoose default connection to DB ' + db_server + ' disconnected', err);
});

var gracefulExit = function() {
	mongoose.connection.close(function() {
		console.log('Mongoose default connection with DB ' + db_server + ' is disconnected');
		process.exit(0);
	});
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// Attempt connection
try {
	var options = {
		db: { native_parser: true },
		server: { poolSize: 5 },
		replset: { },
		user: '',
		pass: ''
	};
	
	// Prevent the connection from dying prematurely
	options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };
	
	mongoose.connect(config.db_path[app.settings.env], options);
	console.log('Trying to connect to DB ' + db_server);
} catch (err) {
	console.log('Server initialization failed ', err.message);
}

module.exports = app