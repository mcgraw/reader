var mongoose = require('mongoose');
var config = require('../config');

// Access our express app
global.app = require('../app');

function clearDatabase(callback) {		
	app.connection.db.dropDatabase(function() {
		callback();	
	});
}

// Let the express app manage the connection instead of here
// Keeping this around for FYI
// function connectToDatabase(callback) {
// 	if (mongoose.connection.readyState === 0) {
// 		mongoose.connect(config.db_path.test, function(err) {
// 			if (err) {
// 				throw err;
// 			}
// 			callback()
// 		});
// 	} else {
// 		callback();
// 	}
// }

// Begin Test Process

before(function(done) {	
	app.openDatabaseConnection(function() {
		clearDatabase(function() {
			done();
		});
	});
});

after(function(done) {
	clearDatabase(function() {
		app.connection.close(function() {
			done();
		});
	});
});