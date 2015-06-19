// Required modules
var mongoose = require('mongoose');

var BlockModel = require('./models/blocks');

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
		
		if (body.language) {
			body.language = body.language.toLowerCase();
		}
		
		db.Article.findByIdAndUpdate({'_id': id}, body, { 'new': true }, function(err, article) {
			"use strict";
						
			if (article) {
				return callback(null, article);
			} else {
				return callback(err, null);
			}
		});
	}
	
	this.findArticle = function(db, id, callback) {
		"use strict";
		
		db.Article.findOne({'_id': id}, function(err, article) {
			"use strict";
									
			if (err) return callback(err, null);
			
			if (!article) return callback(new Error("Couldn't find article"), null);
																	
			return callback(null, article);
		});
	}
	
	// =========
	// Section
	// ========= 
		
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
		
		db.Section.findByIdAndUpdate({'_id': id}, body, { 'new': true }, function(err, section) {
			"use strict";
						
			if (section) {
				return callback(null, section);
			} else {
				return callback(err, null);
			}
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
		
		db.Section.findOneAndRemove({'_id': section_id}, function(err) {
			"use strict";
			
			if (err) return callback(err);
			
			return removeSectionIdFromArticle(db, article_id, section_id, callback);
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
	
	//=========
	// Blocks
	//=========
	
	this.createBlock = function(db, section_id, body, callback) {
		"use strict";
		
		db.Section.findOne({'_id': section_id}, function(err, section) {
			"use strict";
			
			if (err) return callback(err);
			
			if (!section) return callback(new Error("Couldn't find section"));
			
			var block = db.Block({ 'tag': body.style_tag });
			
			switch (body.style_tag) {
				case BlockModel.Type.CONTENT:
					block = populateContentBlock(block, body.style_tag, body.header, body.body);
					break;
				case BlockModel.Type.DOWNLOAD:
					block = populateDownloadBlock(block, body.extension, body.file_path);
					break;
				case BlockModel.Type.QUESTION:
					block = populateQuestionBlock(block, body.question_index, body.questions);
					break;
				case BlockModel.Type.CODE:
					block = populateCodeBlock(block, body.body);
					break;
				case BlockModel.Type.WALKTHROUGH:
					block = populateWalkthroughBlock(block, body.steps);
					break;
				case BlockModel.Type.IMAGE:
					block = populateMediaBlock(block, body.media_path);
					break;
				case BlockModel.Type.VIDEO:
					block = populateMediaBlock(block, body.media_path);
					break;
				case BlockModel.Type.TAKEAWAY:
					block.body = populateTakeawayBlock(block, body.body);
					break;
				case BlockModel.Type.REVIEW:
					break; // Nothing to customize here
				case BlockModel.Type.EMAIL:
					break; // Nothing to customize here
				default:
					return callback(new Error("Unsupported style tag!"), null);
			}
			
			if (!block) return callback(new Error("Failed to create block!"));
			
			section.blocks.push(block);
			section.save(function(err, doc) {
				"use strict";
				
				if (err) {
					return callback(err, null);
				} else {
					return callback(null, doc);
				}
			});	
		});		
	};
	
	this.deleteBlock = function(db, section_id, block_id, callback) {
		"use strict";
		
		console.log(block_id);
		
		db.Section.findOne({'_id': section_id}, function(err, section) {
			"use strict";
			
			if (err) return callback(err);
			
			if (!section) return callback(new Error("Couldn't find section"));
			
			section.blocks.id(block_id).remove();
			section.save(function(err) {
				"use strict";
				callback(err);
			});			
		});
	}
	
	function populateContentBlock(block, header, body) {
		block.header = header;
		block.body = body;
		return block;
	}
	
	function populateDownloadBlock(block, extension, file_path) {
		block.download.extension = extension;
		block.download.path = file_path;
		return block;
	}
		
	function populateQuestionBlock(block, answer_index, questions) {
		var q = { 'answer': answer_index, 'items': [] }
		
		for (question in questions) {
			q.items.push({ '_id': question.index, 'title': question.title });	
		}	
		block.questions.push(q);	
		return block;
	}
	
	function populateCodeBlock(block, body) {
		block.body = body;
		return block;
	}
	
	function populateWalkthroughBlock(block, steps) {
		for (step in steps) {
			block.steps.push({ 'title': step.title, 'media_url': step.media_url });
		}
		return block;
	}
	
	function populateMediaBlock(block, media_path) {
		block.media.push(media_path);
		return block;
	}
		
	function populateTakeawayBlock(block, body) {
		return block;
	}
	
	function populateReviewBlock(block, body) {
		return block;
	}
	
	function populateEmailBlock(block, body) {
		return block;
	}
	
}

module.exports.ArticleDAO = ArticleDAO;