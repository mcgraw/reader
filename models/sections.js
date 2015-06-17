var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LayoutType = {
	CONTENT		: 'Content',
	DOWNLOAD    : 'Download',
	WALKTHROUGH : 'Walkthrough',
	QUESTION    : 'Question',
	CODE		: 'Code',
	STEPS		: 'Steps',
	IMAGE		: 'Image',
	VIDEO		: 'Video',
	REVIEW      : 'Review',
	EMAIL		: 'Email'
};

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
	description: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		required: true,
		default: 5
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	blocks: [{
		style: {
			type: String,
			required: true,
			default: LayoutType.CONTENT,
			enum: [LayoutType.CONTENT, 
				   LayoutType.DOWNLOAD,
				   LayoutType.WALKTHROUGH,
				   LayoutType.QUESTION,
				   LayoutType.CODE,
			   	   LayoutType.STEPS,
			   	   LayoutType.IMAGE,
			       LayoutType.VIDEO,
			       LayoutType.REVIEW,
				   LayoutType.EMAIL]
		},
		header: {
			type: String
		},
		body: {
			type: String
		},
		code: {
			type: String
		},
		media: [{
			type: String
		}],
		steps: [{
			title: {
				type: String
			},
			media_url: {
				type: String
			}
		}],
		questions: [{
			answer: {
				type: Number
			},
			items: [{
				_id: { 
					type: String 
				},
				title: {
					type: String 
				}
			}]
		}],
		download: [{
			extension: {
				type: String
			},
			path: {
				type: String
			}
		}]		
	}]
});

exports.Section = Section;