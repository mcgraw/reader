// Required modules
var ArticleDAO = require('../controllers/articles').ArticleDAO;
var UserDAO = require('../controllers/users').UsersDAO;
var SessionsDAO = require('../controllers/sessions').SessionsDAO;

var config = require('../../config');

// ContentHandler must be constructed with a connected database
function ContentHandler(connection) {
	"use strict";
	
	var sessions = new SessionsDAO();
	var users    = new UserDAO();
	var articles = new ArticleDAO();

	this.displayMainPage = function(req, res, next) {
		"use strict";
		return res.sendFile(config.root_path + '/public/index.html');
	}
	
	// ============================================================
	// Articles
	// ============================================================
	
	this.handleArticleCreation = function(req, res, next) {
		users.findUser(req.db, req.decoded.id, function(err, user) {
			if (err) throw Error("Couldn't locate a user with the id " + req.decoded.id);
			
			var title = req.body.title;
			var language = req.body.language;
						
			articles.createArticle(req.db, user, title, language, function(err, article) {
				
				if(article) {					
					user["authored"].push({"_id": article._id, 
										 "title": article.title,
									  "language": article.language});
									  
					user.save(function(err) {
						if (err) throw Error("Failed to reference newly created article!");
						res.statusCode = 201;
						res.json(article);
					});				
				} else {
					res.statusCode = 500;
					res.json({"message": err.message});
				}
			});
		});
			
	}
	
	this.handleArticleUpdate = function(req, res, next) {				
		articles.updateArticleWithId(req.db, req.params.id, req.body, function(err, article) {
			if (article) {
				res.json(article);
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});		
	}
	
	this.handleArticlePurchase = function(req, res, next) {
		users.findUser(req.db, req.decoded.id, function(err, user) {
			if (err) throw Error("Couldn't locate a user with the id " + req.decoded.id);
			
			articles.findArticle(req.db, req.params.id, function(err, article) {
				if (err) throw Error("Couldn't locate an article with the id " + req.params.id);
			
				if (article) {
					user["purchased"].push({"_id": article._id,
										  "title": article.title,
									   "language": article.language});
					user.save(function(err) {
						if (err) throw Error("Failed to purchase article!");
						res.json(article);
					});
				} else {
					res.statusCode = 500;
					res.json({"message": err.message});
				}
			});		
		});
	}
	
	// ============================================================
	// Sections
	// ============================================================
	
	this.handleSectionCreation = function(req, res, next) {
		articles.createSection(req.db, req.params.id, req.body.title, function(err, section) {
			if (section) {
				res.json(section);
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});		
	}
	
	this.displaySection = function(req, res, next) {
		articles.findSection(req.db, req.params.section_id, function(err, section) {
			"use strict";
			
			if (section) {
				res.json(section);
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});		
	}
	
	this.handleSectionUpdate = function(req, res, next) {
		articles.updateSection(req.db, req.params.section_id, req.body, function(err, section) {
			"use strict";
			
			if (section) {
				res.json(section);
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});
	}
	
	this.handleSectionDelete = function(req, res, next) {
		var article_id = req.params.article_id;
		var section_id = req.params.section_id;
		
		articles.deleteSection(req.db, article_id, section_id, function(err) {
			"use strict";
			
			if (!err) {
				res.json({"message": "removed"});
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});
		
	}
		
	
	// ============================================================
	// Blocks
	// ============================================================
	
	this.handleBlockCreation = function(req, res, next) {
		"use strict";
		
		if (!req.session_id) throw Error("You need to log in to do that");
		
		articles.createBlock(req.db, req.params.id, req.body, function(err, block) {
			"use strict";
			
			if (block) {
				res.json(block);
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});		
	}
	
	this.handleBlockDelete = function(req, res, next) {
		"use strict";
		
		if (!req.session_id) throw Error("You need to log in to do that");
		
		articles.deleteBlock(req.db, req.params.section_id, req.params.block_id, function(err) {
			"use strict";
			
			if (!err) {
				res.json({"message": "removed"});
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});
	}
}

module.exports = ContentHandler;