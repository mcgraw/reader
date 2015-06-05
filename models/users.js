var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = new Schema( {
	email: {
		type: String,
		required: true	
	},
	name: {
		type: String
	},
	photo_url: {
		type: String
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

exports.User = User;