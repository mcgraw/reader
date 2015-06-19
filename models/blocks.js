var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LayoutType = {
	CONTENT		: 1000,
	DOWNLOAD    : 1001,
	WALKTHROUGH : 1002,
	QUESTION    : 1003,
	CODE		: 1004,
	STEPS		: 1005,
	IMAGE		: 1006,
	VIDEO		: 1007,
	TAKEAWAY    : 1008,
	REVIEW      : 1009,
	EMAIL		: 1010
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
		   	   LayoutType.STEPS,
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
});

exports.Block = Block;
exports.Type = LayoutType;