var mongoose = require('mongoose');
var config = require('../config');

function clearDatabase(callback) {		
	mongoose.connection.db.dropDatabase(function() {
		callback();	
	});
}

function connectToDatabase(callback) {
	if (mongoose.connection.readyState === 0) {
		mongoose.connect(config.db_path.test, function(err) {
			if (err) {
				throw err;
			}
			callback()
		});
	} else {
		callback();
	}
}

// Begin Test Process

before(function(done) {
	if (mongoose.connection.db) return done();

	connectToDatabase(function() {
		clearDatabase(function() {
			done();
		});
	});
});


after(function(done) {
	clearDatabase(function() {
		mongoose.connection.close(function() {
			done();
		});
	});
});