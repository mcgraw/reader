var crypto = require('crypto');
var config = require('../../config')
var jwt	   = require('jsonwebtoken');

function SessionsDAO() {
	'use strict';
	
	this.authenticateSession = function(db, password, email, callback) {
		
		db.User.findOne({ 
			email: email 
		}).select('name email password').exec(function(err, user) {
			if (err) { throw err; }
			
			if (!user) {
				return callback(new Error('Authentication failed. User not found.'), null);
			} else if (user) {
				var validPassword = user.comparePassword(password);
				if (!validPassword) {
					return callback(new Error('Authentication failed. Wrong password.'), null);
				} else {
					// create a token
					var token = jwt.sign({
						name: user.name,
						email: user.email
					}, config.secret, {
						expiresInMinutes: 1440 // 24 hours
					});
					
					// return info including token
					callback(null, {
						message: 'Here is your token! Enjoy your stay.',
						token: token
					});
				}
			}
		});
	};
		
}

module.exports.SessionsDAO = SessionsDAO;