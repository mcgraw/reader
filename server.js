var express      = require('express');
var app          = express();                   // Framework to handle routing requests
var mongoose     = require('mongoose');      	// MongoDB modeling tool 

var path         = require('path');         	// Utilities for handling and transforming file paths
// var logger       = require('winston');        	// HTTP request logger
var cookieParser = require('cookie-parser'); 	// Populates req.cookies with an object keyed
var bodyParser   = require('body-parser');   	// https://www.npmjs.com/package/body-parser
// var favicon      = require('serve-favicon'); 	// Serves and caches a favicon

var config       = require('./config');			// Shared configuration items
var routes       = require('./app/routes');  // Routes for our application   

// Register templating engine
app.set('views', path.join(__dirname, 'views'));

// Express middleware to populate 'req.cookies' so we can access cookies
app.use(cookieParser());

// Express middleware to populate 'req.body' so we can access POST variables
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Expose public directory for thefront-end client
app.use(express.static(path.join(__dirname, '/public')));

// Setup the connection to the database
var options = {
	db: { native_parser: true },
	server: { poolSize: 5 },
	replset: { },
	user: '',
	pass: ''
};
options.server.socketOptions = options.replset.socketOptions = { keepAlive: 1 };
	
var db_server  = app.settings.env;
var db_path    = config.db_path[db_server];
var db_port    = config.db_port[db_server];
var connection = mongoose.createConnection(db_path);

// Connection throws an error
connection.on('error', function(err) {
	'use strict';
	console.error('Failed to connect to DB ' + db_server + ' on startup', err);
});

// Connection is disconnected
connection.on('disconnected', function(err) {
	'use strict';
	console.error('Mongoose default connection to DB ' + db_server + ' disconnected', err);
});

var gracefulExit = function() {
	'use strict';
	connection.close(function() {
		console.log('Mongoose default connection with DB ' + db_server + ' is disconnected');
		process.exit(0);
	});
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

// The test environment will need to manage the connection from the before hook
var connection_callback;
function openDatabaseConnection(callback) {
	'use strict';
	connection_callback = callback;
	
	console.log('Trying to connect to the ' + db_server + ' DB!');
	
	// Establish the connection with the object we created at launch
	connection.once('open', function() {
		console.log('Connected to ' + db_server + ' DB!');
		
		// Setup database middleware
		var sessions = require('./app/models/sessions');
		var users = require('./app/models/users');
		var articles = require('./app/models/articles');
		var sections = require('./app/models/sections');
		var blocks = require('./app/models/blocks');		
		function schemaMiddleware(req, res, next) {
			req.db = {
				Session: connection.model('Session', sessions.Session, 'sessions'),
				User: connection.model('User', users.User, 'users'),
				Article: connection.model('Article', articles.Article, 'articles'),
				Section: connection.model('Section', sections.Section, 'sections'),
				Block: connection.model('Block', blocks.Block, 'blocks')
			};
			return next();
		}
		
		// Application routes
		routes(app, express, schemaMiddleware);
		
		// Start express server (move this to env)
		app.listen(db_port, function() {
			console.log('Express server listening on port 8080');
			connection_callback();
		});	
	});
}

// If we're not in a test env, fire up the server connection
if (db_server !== 'test') {
	openDatabaseConnection(function() { });
}

module.exports = app;
module.exports.connection = connection;
module.exports.openDatabaseConnection = openDatabaseConnection;