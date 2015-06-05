// Required modules

// UserHandler must be constructed with a connected database
function UserHandler(db) {
	"use strict";
	
	this.handleAccountCreation = function(req, res, next) {
		"use strict";
			
		var user = new req.db.User({ email: req.body.email, name: req.body.name });
		user.save(function(err) {
		 	if (err) next(err);
			
		 	console.log("created account: " + user.email + " with name " + user.name);
		 	res.json(user);
		});	
	}
}

module.exports = UserHandler;