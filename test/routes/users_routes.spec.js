'use strict';

var request = require('supertest');

var agent = request.agent(app);

describe('Account Routes', function() {
	
	describe('/accounts - POST (create new account)', function() {
		
		it('should create a new account', function(done) {
			var body = { 'email': 'reader@xmcgraw.com',
					  'password': 'jimbo2222',
				    	'verify': 'jimbo2222',
					      'name': 'Reader McGraw',
					  'username': 'reader' }
				
			agent
			.post('/accounts')
			.send(body)
			.expect(201, function(err, res) {
				if (err) return done(err);
				
				expect(res.body.message).to.equal('Session started');
				done();
			});	
		});
		
	});
	
});

