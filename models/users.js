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