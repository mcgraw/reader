var crypto = require('crypto');

function SessionsDAO() {
	"use strict";
	
	this.startSession = function(db, email, callback) {
		"use strict";
		
		// Generate session id
		var current_date = (new Date()).valueOf().toString();
		var random = Math.random().toString();
		var session_id = crypto.createHash('sha1').update(current_date + random).digest('hex');
		
		console.log(email);
		
		// Create session document
		var session = db.Session({'email': email, '_id': session_id});
		session.save(function(err, doc) {
			"use strict";
			
			if (err) {
				callback(err, null);
			} else {
				console.log("New session created for " + doc.email);
				callback(null, session_id);
			}
		});		
	}
	
	this.endSession = function(db, session_id, callback) {
		"use strict";
		
		db.Session.findByIdAndRemove({'_id': session_id}, function(err, count) {
			console.log("removed session: " + count)
			callback(err);
		});		
	}
		
}

module.exports.SessionsDAO = SessionsDAO;