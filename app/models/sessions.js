var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Session = new Schema( {
	_id: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,	
		unique: true
	}
});

exports.Session = Session;