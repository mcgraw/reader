'use strict';

var SessionsDAO = require('../../sessions').SessionsDAO;
var UsersDAO = require('../../users').UsersDAO;
var ArticlesDAO = require('../../articles').ArticleDAO;

describe('Users', function() {
	
	describe('Creating a new user', function() {
		
		it('should add a valid user', function(done) {	 
			var users = new UsersDAO()
			users.addUser(db, "pass1234", "david@xmcgraw.com", "David", "mcgraw", function(err, user) {
				expect(user.email).to.be.equal("david@xmcgraw.com");
				expect(user.password).to.not.be.equal("pass1234");
				done();
			});	
		});
		
		it('should not be logged in', function(done) {
			db.Session.findOne({}, function(err, session) {
				should.not.exist(session);
				done()
			});
		});
		
		it('should validate login', function(done) {
			var users = new UsersDAO()
			users.validateLogin(db, "pass1234", "david@xmcgraw.com", function(err, user) {
				expect(user.email).to.be.equal("david@xmcgraw.com");
				expect(user.password).to.not.be.equal("pass1234");
				done();
			});	
		});
		
		it('should start session', function(done) {
			var sessions = new SessionsDAO()
			sessions.startSession(db, "david@xmcgraw.com", function(err, session_id) {
				expect(session_id).to.be.a('string');
				done();
	        });
		});
			
	});	
	
});
