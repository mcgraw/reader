'use strict';

var config = require('../config');
var mongoose = require('mongoose');
	
// ensure NODE_ENV is set to 'test'
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';

module.exports = {
	
	clearDatabase: function(callback) {
		for(var i in mongoose.connection.collections) {
			mongoose.connection.collections[i].remove(function() {});
		}
		callback();
	},

	connectToDatabase: function(callback) {
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
}