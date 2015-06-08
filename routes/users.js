// Required modules
var bcrypt = require('bcrypt-nodejs');

// UserHandler must be constructed with a connected database
function UserHandler(db) {
	"use strict";
	
	this.handleAccountCreation = function(req, res, next) {
		"use strict";
		
		// Parameters
		var email = req.body.email;
		var password = req.body.password;
		
		// Generate password hash
		var salt = bcrypt.genSaltSync();
		var password_hash = bcrypt.hashSync(password, salt);
		
		// Create object
		var user = new req.db.User({ email: email, 
							      password: password_hash });
		user.save(function(err, object) {
			"use strict";
			
		 	if (err) next(err);
			
			console.log("New account created: " + user.email);
		 	res.json(user);
		});	
	}
}

module.exports = UserHandler;