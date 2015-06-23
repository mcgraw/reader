// Required modules
var bcrypt = require('bcrypt-nodejs');

// UsersDAO must be constructed with a connected database
function UsersDAO() {
	'use strict';
								  
	this.addUser = function(db, password, email, name, username, callback) {
		
		// Generate password hash
		var salt = bcrypt.genSaltSync();
		var hash = bcrypt.hashSync(password, salt);
		
		// Create object
		var user = new db.User({ email: email, 
							  password: hash,
							  	  name: name,
							  username: username });
							  
		user.save(function(err, doc) {
			
		 	if (err) { throw err; }
			
			if (doc) {
				callback(null, doc);
			} else {
				callback(Error('Unable to add user to the data store'), null);
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
	
	this.validateLogin = function(db, password, email, callback) {
		
		db.User.findOne({ 'email': email }, function(err, user) {
			
			if (err) { return callback(err, null); }
			
			if (user) {
				if (bcrypt.compareSync(password, user.password)) {
					callback(null, user);
				} else {
					var invalid_password_err = new Error('Invalid Password');
					invalid_password_err.invalid_password = true;
					callback(invalid_password_err, null);
				}
			} else {
				var no_such_user = new Error('User: ' + email + ' does not exist');
				no_such_user.no_such_user = true;
				callback(no_such_user, null);
			}
		});
	};

}

module.exports.UsersDAO = UsersDAO;