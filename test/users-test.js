'use strict';

var utils = require('./utils');

var UserModel = require('../models/users').User;
var UserDAO = require('../users').UsersDAO;

describe('Users', function() {
	
	it('should add user', function() {
		
		// test setup
		var u = {
			email: "david@xmcgraw.com",
			password: "asdf1234" 
		};
		
		var users_dao = new UserDAO()	
					
		users_dao.addUser(db, u.password, u.email, function(err, user) {
			should.not.exist(err);
			
			done();
		});
	});

	
});