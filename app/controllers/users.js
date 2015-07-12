// Required modules
var bcrypt = require('bcrypt-nodejs');

// UsersDAO must be constructed with a connected database
function UsersDAO() {
	'use strict';
								  
	this.addUser = function(db, password, email, name, username, callback) {
		
		// Create object
		var user = new db.User({ email: email, 
							  password: password,
							  	  name: name,
							  username: username });
							  
		user.save(function(err, doc) {
			
		 	if (err) { throw err; }
			
			if (doc) {
				callback(null, doc);
			} else {
				callback(new Error('Unable to add user to the data store'), null);
			}
			 
		});	
	};
	
	this.findUser = function(db, username, callback) {
		
		db.User.findOne({ 'username': username }, function(err, user) {
			
			if (err) { return callback(err, null); }
			
			if (user) {
				return callback(null, user);
			} else {
				return callback(new Error('No such user with username!'), null);
			}
		});
	};
	
}

module.exports.UsersDAO = UsersDAO;