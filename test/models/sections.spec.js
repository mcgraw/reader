'use strict';

var SessionsDAO = require('../../sessions').SessionsDAO;
var UsersDAO = require('../../users').UsersDAO;
var ArticlesDAO = require('../../articles').ArticleDAO;
	
describe('Sections', function() {
	
	var user = new db.User({email: "david@xmcgraw.com", password: "pass1234"});
	var articles = new ArticlesDAO();
			
	describe('Creating a new section', function() {
			
		it('should create a new section', function(done) {
			articles.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				articles.createSection(db, article.id, "Introduction", function(err, section) {
					expect(section).to.exist;
					expect(section.title).to.equal("Introduction");					
					done();				
				});
			});
		});
						
	});
	
	describe('Updating a section', function() {
		
		it('should update section title and description', function(done) {
			articles.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				articles.createSection(db, article.id, "Introduction", function(err, section) {
					var body = { 'title': 'A Better Introduction', 'description': 'Let\'s learn!' }
				
					articles.updateSection(db, section.id, body, function(err, section) {
						expect(section).to.exist;
						expect(section.title).to.equal('A Better Introduction');
						expect(section.description).to.equal('Let\'s learn!');
						done();				
					});			
				});
			});
		});
		
		it('should find an existing section', function(done) {
			articles.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				articles.createSection(db, article.id, "Introduction", function(err, section) {
					articles.findSection(db, section.id, function(err, section) {
						expect(section).to.exist;
						done();				
					});			
				});
			});
		});
	});
	
	describe('Deleting a section', function() {
		
		it('should delete a section', function(done) {
			articles.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
				articles.createSection(db, article.id, "Introduction", function(err, section) {
					articles.deleteSection(db, article.id, section.id, function(err, section) {
						expect(section).to.not.exist;
						done();				
					});			
				});
			});
		});
		
	});
	
});