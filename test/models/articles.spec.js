'use strict';

var SessionsDAO = require('../../sessions').SessionsDAO;
var UsersDAO = require('../../users').UsersDAO;
var ArticlesDAO = require('../../articles').ArticleDAO;

var sessions = require('../../models/sessions');
var users = require('../../models/users');
var articles = require('../../models/articles');

var connection = require('../../app').connection;

describe('Articles', function() {

	var db = {
		Session: connection.model('Session', sessions.Session, 'sessions'),
		User: connection.model('User', users.User, 'users'),
		Article: connection.model('Article', articles.Article, 'articles')
	};
		
	var user = new db.User({email: "david@xmcgraw.com", password: "pass1234"});
	var dao = new ArticlesDAO();
			
	describe('Creating a new article', function() {
		
		it('should create a new article', function(done) {
			dao.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				expect(article.title).to.be.equal("Learning Swift");
				expect(article.language).to.be.equal("swift");
				expect(article.language).to.not.be.equal("Swift");
				done();
			});
		});
		
	});
	
	describe('Updating an article', function() {
		
		var active_article;
		beforeEach(function(done) {
			dao.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				active_article = article;
				done();
			});		
		});
		
		it('should update article title', function(done) {
			var body = { 'title': 'Learning Swift 2.0' };
			dao.updateArticleWithId(db, active_article.id, body, function(err, article) {
				expect(article).to.exist;
				expect(article.title).to.be.equal("Learning Swift 2.0");
				expect(article.language).to.be.equal("swift");
				done();
			});
		});
		
		it('should update article language', function(done) {
			var body = {'title': 'Learning Swift 2.0', 'language': 'Swifty'};
			dao.updateArticleWithId(db, active_article.id, body, function(err, article) {
				expect(article).to.exist;
				expect(article.language).to.be.equal("swifty");
				done();
			});
		});
		
	})
	
});