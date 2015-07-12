var crypto = require('crypto');
var config = require('../../config')
var jwt	   = require('jsonwebtoken');

function SessionsDAO() {
	'use strict';
	
	this.authenticateSession = function(db, res, password, email, callback) {
		
		db.User.findOne({ email: email }, 'name email password', function(err, user) {
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
					
					var expire = new Date();
					expire.setHours(expire.getHours() + 24);
					
					res.setHeader('access-token', token);
					res.setHeader('token-type', 'Bearer');
					res.setHeader('client', 'web');
					res.setHeader('expiry', expire);
					res.setHeader('uid', user._id);
					
					// return info including token
					callback(null, {
						id: user._id,
						name: user.name
					});
				}
			}
		});
	};
		
}

module.exports.SessionsDAO = SessionsDAO;