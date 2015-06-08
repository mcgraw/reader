var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Section = new Schema( {
	index: {
		type: Number,
		required: true
	},
	locked: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true,
		default: 5
	},
	layout: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Layout'
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

exports.Section = Section;