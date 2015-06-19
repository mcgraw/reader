// Required modules
var mongoose = require('mongoose');

// DAO
function ArticleDAO() {
	"use strict";
	
	this.createArticle = function(db, author, title, language, callback) {
		"use strict";
			
		var article = db.Article({"author": {"_id": author._id, "photo_url": author.photo_url },
							       "title": title, 
							    "language": language.toLowerCase()});
		article.save(function(err, doc) {
			"use strict";
	
			if (doc) {					
				return callback(null, doc);
			} else {
				return callback(err, null);
			}
		});

	}	
		
	this.updateArticleWithId = function(db, id, body, callback) {
		"use strict";
				
		db.Article.findOne({'_id': id}, function(err, article) {
			"use strict";
						
			if (err) return callback(err, null);
			
			if (!article) return callback(new Error("Couldn't find article"), null);
								
			if (body.language) {
				body.language = body.language.toLowerCase();
			}
									
			article.update(body, function(err, doc) {
				"use strict";
				
				if (doc) {
					return callback(null, doc);
				} else {
					return callback(err, null);
				}
			});
		});
	}
	
		
	this.createSection = function(db, id, title, callback) {
		"use strict";
		
		db.Article.findOne({'_id': id}, function(err, article) {
			"use strict";
						
			if (err) return callback(err, null);
			
			if (!article) return callback(new Error("Couldn't find article"), null);
				
			var section = db.Section({"title": title});
			section.save(function(err, doc) {
				"use strict";
				
				if (doc) {
					article.sections.push(doc.id);
					article.save(function(err, article) {
						"use strict";
						
						if (article) {
							return callback(null, doc);
						} else {
							return callback(err, null);
						}
					});					
				} else {
					return callback(err, null);
				}
			});
		});
	}
	
	this.updateSection = function(db, id, body, callback) {
		"use strict";
		
		db.Section.findOne({'_id': id}, function(err, section) {
			"use strict";
						
			if (err) return callback(err, null);
			
			if (!section) return callback(new Error("Couldn't find section"), null);
																	
			section.update(body, function(err, doc) {
				"use strict";
								
				if (doc) {
					return callback(null, doc);
				} else {
					return callback(err, null);
				}
			});
		});
		
	}
	
	this.findSection = function(db, id, callback) {
		"use strict";
		
		db.Section.findOne({'_id': id}, function(err, section) {
			"use strict";
						
			if (err) return callback(err, null);
			
			if (!section) return callback(new Error("Couldn't find section"), null);
																	
			return callback(null, section);
		});
	}
	
	this.deleteSection = function(db, article_id, section_id, callback) {
		"use strict";
		
		db.Section.findOne({'_id': section_id}, function(err, section) {
			"use strict";
			
			if (err) return callback(err);
			
			// if (!section) 
			return callback(new Error("Couldn't find section"));
			
			section.remove(function(err) {
				"use strict";
				
				if (err) return callback(err);
				
				return removeSectionIdFromArticle(db, article_id, section_id, callback);
			});		
		});
	}
	
	function removeSectionIdFromArticle(db, article_id, section_id, callback) {
		"use strict";
		
		db.Article.findOne({'_id': article_id}, function(err, article) {
			"use strict";
			
			if (err) return callback(err);
			
			if (!article) return callback(new Error("Couldn't find article"));
			
			article.sections.pull({ '_id': section_id });
			article.save(function(err, doc) {
				"use strict";
				
				if (err) return callback(err);
				
				return callback(null);				
			});			
		});	
	}
}

module.exports.ArticleDAO = ArticleDAO;