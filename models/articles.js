var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var UserSchema = require('./users')

var Article = new Schema( {
	author: {
		type: UserSchema,
		required: true
	},
	title: {
		type: String,
		required: true	
	},
	language: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true,
		default: 5
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	}
});

exports.Article = Article;