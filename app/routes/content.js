// Required modules
var ArticleDAO = require('../controllers/articles').ArticleDAO;
var SessionsDAO = require('../controllers/sessions').SessionsDAO;

// ContentHandler must be constructed with a connected database
function ContentHandler(connection) {
	"use strict";
	
	var sessions = new SessionsDAO();
	var articles = new ArticleDAO();

	this.displayMainPage = function(req, res, next) {
		"use strict";
		return res.render('index', { title: 'Reader' });
		return res.sendfile('./public/index.html');
	}
	
	// ============================================================
	// Articles
	// ============================================================
	
	this.handleArticleCreation = function(req, res, next) {
		"use strict";
		
		// if (!req.session_id) return res.redirect("/login");
		if (!req.session_id) throw Error("You need to log in to do that");
			
		sessions.getSessionUser(req.db, req.session_id, function(err, user) {
			"use strict";
			
			var title = req.body.title;
			var language = req.body.language;
						
			articles.createArticle(req.db, user, title, language, function(err, article) {
				"use strict";
				
				if(article) {					
					user["authored"].push({"_id": article._id, 
										 "title": article.title,
									  "language": article.language});
									  
					user.save(function(err) {
						if (err) throw Error("Failed to reference newly created article!");
						res.statusCode = 201;
						res.json({"status": "ok"});
					});				
				} else {
					res.statusCode = 500;
					res.json({"message": err.message});
				}
			});
		});		
	}
	
	this.handleArticleUpdate = function(req, res, next) {
		"use strict";
		
		if (!req.session_id) throw Error("You need to log in to do that");
							
		articles.updateArticleWithId(req.db, req.params.id, req.body, function(err, article) {
			"use strict";
			
			if (article) {
				res.json(article);
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});		
	}
	
	// ============================================================
	// Sections
	// ============================================================
	
	this.handleSectionCreation = function(req, res, next) {
		"use strict";
		
		if (!req.session_id) throw Error("You need to log in to do that");
		
		articles.createSection(req.db, req.params.id, req.body.title, function(err, section) {
			"use strict";
			
			if (section) {
				res.json(section);
			} else {
				res.statusCode = 500;
				res.json({"message": err.message});
			}
		});		
	}
	
	this.displaySection = function(req, res, next) {
		"use strict";
		
		if (!req.session_id) throw Error("You need to log in to do that");
		
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
		"use strict";
		
		if (!req.session_id) throw Error("You need to log in to do that");
		
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
		"use strict";
		
		if (!req.session_id) throw Error("You need to log in to do that");
		
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