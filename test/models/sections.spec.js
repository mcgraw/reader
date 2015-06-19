'use strict';

var SessionsDAO = require('../../sessions').SessionsDAO;
var UsersDAO = require('../../users').UsersDAO;
var ArticlesDAO = require('../../articles').ArticleDAO;

var sessions = require('../../models/sessions');
var users = require('../../models/users');
var articles = require('../../models/articles');
var sections = require('../../models/sections');

var connection = require('../../app').connection;
	
describe('Sections', function() {
	
	var db = {
		Session: connection.model('Session', sessions.Session, 'sessions'),
		User: connection.model('User', users.User, 'users'),
		Article: connection.model('Article', articles.Article, 'articles'),
		Section: connection.model('Section', sections.Section, 'sections')
	};
	
	var user = new db.User({email: "david@xmcgraw.com", password: "pass1234"});
	var dao = new ArticlesDAO();
	
	var active_article;
	beforeEach(function(done) {
		dao.createArticle(db, user, "Learning Swift", "swift", function(err, article) {
			active_article = article;
			done();
		});		
	});
			
	describe('Creating a new section', function() {
			
		it('should create a new section', function(done) {
			dao.createSection(db, active_article.id, "Introduction", function(err, section) {
				expect(section).to.exist;
				expect(section.title).to.equal("Introduction");					
				done();				
			});
		});
						
	});
	
	describe('Updating a section', function() {
		
		var active_section;
		beforeEach(function(done) {
			dao.createSection(db, active_article.id, "Introduction", function(err, section) {
				active_section = section;
				done();
			});
		});
		
		it('should update section title and description', function(done) {
			var body = { 'title': 'A Better Introduction', 'description': 'Let\'s learn!' }
			dao.updateSection(db, active_section.id, body, function(err, section) {
				expect(section).to.exist;
				expect(section.title).to.equal('A Better Introduction');
				expect(section.description).to.equal('Let\'s learn!');
				done();				
			});			
		});
		
		it('should find an existing section', function(done) {
			dao.findSection(db, active_section.id, function(err, section) {
				expect(section).to.exist;
				done();				
			});			
		});
	});
	
	describe('Removing a section', function() {
		
		var active_section;
		beforeEach(function(done) {
			dao.createSection(db, active_article.id, "Introduction", function(err, section) {
				active_section = section;
				done();
			});
		});
		
		it('should delete a section', function(done) {
			dao.deleteSection(db, active_article.id, active_section.id, function(err, section) {
				expect(section).to.not.exist;
				
				dao.findArticle(db, active_article.id, function(err, article) {
					expect(article).to.exist;
					expect(article.sections).to.be.empty;
					done();
				});				
			});			
		});
		
	});
	
});