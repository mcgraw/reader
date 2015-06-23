var crypto = require('crypto');

function SessionsDAO() {
	'use strict';
	
	this.startSession = function(db, email, callback) {
		
		// Generate session id
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');
			
		// Create session document
		var session = db.Session({ '_id': session_id, 'email': email});
		session.save(function(err) {
			
			if (err) {
				callback(err, null);
			} else {
				callback(null, session_id);
			}
		});		
	};
	
	this.endSession = function(db, session_id, callback) {
		
		db.Session.findByIdAndRemove({'_id': session_id}, function(err, count) {
			console.log('removed session: ' + count);
			callback(err);
		});		
	};

	this.getSessionUser = function(db, session_id, callback) {
			
		db.Session.findOne({'_id': session_id}, function(err, session) {
			
			if (err) { return callback(Error('Unable to fetch session!'), null); }
			
			db.User.findOne({'email': session.email}, function(err, user) {
							
				if (err) { return callback(Error('Unable to fetch user!'), null); }
				return callback(null, user);
			});
		});
	};
	
	this.getSessionUserObjectId = function(db, session_id, callback) {
		
		if (!session_id) {
			return callback(Error('Session not set'), null);
		}
				
		db.Session.findOne({'_id': session_id}, function(err, session) {
			
			if (err) { return callback(err, null); }
			
			if (!session) {
				return callback(new Error('Session: ' + session_id + ' does not exist'), null);
			}			
			callback(null, session.user_id);			
		});	
	};
	
}

module.exports.SessionsDAO = SessionsDAO;