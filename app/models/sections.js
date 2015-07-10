var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Blocks = require('./blocks').Block

var Section = new Schema( {
	locked: {
		type: Boolean,
		default: true
	},
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
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
	blocks: [
		Blocks
	]
});

exports.Section = Section;