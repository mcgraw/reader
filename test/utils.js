'use strict';

var config = require('../config');

var sessions = require('../models/sessions');
var users = require('../models/users');
var articles = require('../models/articles');
var sections = require('../models/sections');
var layouts = require('../models/layouts');

global.mongoose = require('mongoose');
	
// ensure NODE_ENV is set to 'test'
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';

beforeEach(function(done) {	
	
	function clearDatabase() {
		for(var i in mongoose.connection.collections) {
			mongoose.connection.collections[i].remove(function() {});
		}
		return done();
	}
	
	if (mongoose.connection.readyState === 0) {
		mongoose.connect(config.db_path.test, function(err) {
			if (err) {
				throw err;
			}
			
			// Make our models available to our tests
			global.db = {
				User: mongoose.connection.model('User', users.User, 'users'),
				Article: mongoose.connection.model('Article', articles.Article, 'articles'),
				Section: mongoose.connection.model('Section', sections.Section, 'sections'),
				Layout: mongoose.connection.model('Layout', layouts.Layout, 'layouts'),
				Session: mongoose.connection.model('Session', sessions.Session, 'sessions')
			};
	
			return clearDatabase();
		})
	} else {
		return clearDatabase();
	}
	
});

afterEach(function(done) {
	mongoose.disconnect();
	return done();
})