// Required modules
var mongoose = require('mongoose');

// DAO
function ArticleDAO() {
	"use strict";
	
	this.createArticle = function(db, author, title, language, callback) {
		"use strict";
			
		var article = db.Article({"author": author._id, 
							       "title": title, 
							    "language": language.toLowerCase()});
		article.save(function(err, doc) {
			"use strict";
	
			if (doc) {					
				callback(null, doc);
			} else {
				callback(err, null);
			}
		});

	}
			
}

module.exports.ArticleDAO = ArticleDAO;