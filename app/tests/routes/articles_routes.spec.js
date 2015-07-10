'use strict';

var request = require('supertest');
var UsersDAO = require('../../controllers/users').UsersDAO;

var agent = request.agent(app);
		
describe('Article Routes', function() {
	
	before(function(done) {
		var body = { 'email': 'articles@xmcgraw.com',
				  'password': 'jimbo2222',
			    	'verify': 'jimbo2222',
				      'name': 'Article McGraw',
				  'username': 'article' }
			
		agent
		.post('/accounts')
		.send(body)
		.expect(201, function(err, res) {
			if (err) return done(err);
			done();
		});
	});
	
	describe('/articles - POST (create new article)', function() {
				
		it('should create a new article', function(done) {
			var body = { 'title': 'Learning Node.js',
					  'language': 'Javascript' }
				
			agent
			.post('/articles')
			.send(body)
			.expect(201, function(err, res) {
				if (err) return done(err);
				expect(res.body.status).to.equal('ok');
				done();
			});	
		});
	});
	
});

