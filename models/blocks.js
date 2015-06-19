var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LayoutType = {
	CONTENT		: 1000,
	DOWNLOAD    : 1001,
	WALKTHROUGH : 1002,
	QUESTION    : 1003,
	CODE		: 1004,
	IMAGE		: 1005,
	VIDEO		: 1006,
	TAKEAWAY    : 1007,
	REVIEW      : 1008,
	EMAIL		: 1009
};

var Block = new Schema( {
	style: {
		type: Number,
		required: true,
		default: LayoutType.CONTENT,
		enum: [LayoutType.CONTENT, 
			   LayoutType.DOWNLOAD,
			   LayoutType.WALKTHROUGH,
			   LayoutType.QUESTION,
			   LayoutType.CODE,
		   	   LayoutType.IMAGE,
		       LayoutType.VIDEO,
			   LayoutType.TAKEAWAY,
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
			type: Number,
			required: true
		},
		items: [{
			_id: { 
				type: Number,
				required: true 
			},
			title: {
				type: String,
				required: true
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
});

exports.Block = Block;
exports.Type = LayoutType;