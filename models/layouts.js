var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LayoutType = {
	CONTENT		: 'Content',
	DOWNLOAD    : 'Download',
	WALKTHROUGH : 'Walkthrough',
	QUESTION    : 'Question',
	STEPS		: 'Steps',
	IMAGE		: 'Image',
	VIDEO		: 'Video',
	REVIEW      : 'Review'
};

var Layout = new Schema( {
	layout_type: {
		type: String,
		required: true,
		default: LayoutType.CONTENT,
		enum: [LayoutType.CONTENT, 
			   LayoutType.DOWNLOAD,
			   LayoutType.WALKTHROUGH,
			   LayoutType.QUESTION,
			   LayoutType.STEPS,
			   LayoutType.IMAGE,
			   LayoutType.VIDEO,
			   LayoutType.REVIEW]
	},
	header: {
		type: String
	},
	text: {
		type: String
	},
	photo_url: {
		type: String
	},
	movie_url: {
		type: String
	},
	actions: [{
		text: {
			type: String,
			trim: true
		},
		is_answer: {
			type: Boolean,
			trim: true
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

exports.Layout = Layout;