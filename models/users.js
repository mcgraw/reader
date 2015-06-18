var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = new Schema( {
	email: {
		type: String,
		required: true,	
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	registered: {
		type: Boolean,
		default: false
	},
	biography: {
		type: String
	},
	admin: {
		type: Boolean,
		default: false
	},
	photo_url: {
		type: String
	},
	authored: [{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article'
		}, 
		title: {
			type: String
		},
		language: {
			type: String
		}
	}],
	purchased: [{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article'
		}, 
		title: {
			type: String
		},
		language: {
			type: String
		}
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

exports.User = User;