global.chai = require('chai');
global.expect = global.chai.expect;
global.assert = global.chai.assert;
global.should = global.chai.should();

// ensure NODE_ENV is set to 'test'
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.TEST_ENV = process.env.TEST_ENV || 'test';

var SessionModel = require('../models/sessions').Session;
var UserModel = require('../models/users').User;
var ArticleModel = require('../models/articles').Article;
var SectionModel = require('../models/sections').Section;

var mongoose = require('mongoose');

// Access our express app
global.app = require('../app');

// Contains database model schemas
global.db = {
	User: mongoose.connection.model('User', UserModel, 'users'),
	Session: mongoose.connection.model('Session', SessionModel, 'sessions'),
	Article: mongoose.connection.model('Article', ArticleModel, 'articles'),
	Section: mongoose.connection.model('Section', SectionModel, 'sections')
};