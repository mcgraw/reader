// Required modules
var ArticleDAO = require('../articles').ArticleDAO;
var SessionsDAO = require('../sessions').SessionsDAO;

// ContentHandler must be constructed with a connected database
function ContentHandler(connection) {
	"use strict";
	
	var sessions = new SessionsDAO();
	var articles = new ArticleDAO();
	
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
					console.log("Created a new article: " + title);
					
					user["authored"].push({"_id": article._id, 
										 "title": article.title,
									  "language": article.language});
									  
					user.save(function(err) {
						if (err) throw Error("Failed to reference newly created article!");
						res.json({"status": "ok"});
					});				
				} else {
					res.statusCode = 500;
					return res.json({"message": err});
				}
			});
		});		
	}
	
	this.displayMainPage = function(req, res, next) {
		"use strict";
		return res.json({"status": "OK"});
	}
}

module.exports = ContentHandler;