var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var UserSchema = require('./users')

var Article = new Schema( {
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
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
	sections: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	}],
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