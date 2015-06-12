'use strict';

var SessionsDAO = require('../../sessions').SessionsDAO;
var UsersDAO = require('../../users').UsersDAO;
var ArticlesDAO = require('../../articles').ArticleDAO;
	
describe('Articles', function() {
	
	describe('Creating a new article', function() {
		
		var user = new db.User({email: "david@xmcgraw.com", password: "pass1234"});
		var articles = new ArticlesDAO();
			
		it('should create a new article', function(done) {
			articles.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				expect(article.title).to.be.equal("Learning Swift");
				expect(article.language).to.be.equal("swift");
				expect(article.language).to.not.be.equal("Swift");
				done();
			});
		});
		
		it('should update article title', function(done) {
			articles.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				articles.updateArticleWithId(db, article.id, "Learning Swift 2.0", "", function(err, article) {
					expect(article.title).to.be.equal("Learning Swift 2.0");
					expect(article.language).to.be.equal("swift");
					done();
				});
			});
		});
		
		it('should update article language', function(done) {
			articles.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				articles.updateArticleWithId(db, article.id, "Learning Swift 2.0", "Swifty", function(err, article) {
					expect(article.language).to.be.equal("swifty");
					done();
				});
			});
		});
			
	})
	
});