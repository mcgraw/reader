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
		first: {
			type: String,
			trim: true
		},
		last: {
			type: String,
			trim: true
		}
	},
	admin: {
		type: Boolean,
		default: false
	},
	photo_url: {
		type: String
	},
	authored: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
	}],
	purchased: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Article'
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