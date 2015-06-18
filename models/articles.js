var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var UserSchema = require('./users')

var Article = new Schema( {
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
	published: {
		type: Boolean,
		required: true,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	author: {
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		name: {
			type: String
		},
		social: {
			twitter: {
				type: String
			},
			blog: {
				type: String
			}
		},
		photo_url: {
			type: String
		}
	},
	sections: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Section'
	}]
});

exports.Article = Article;