// Required modules

// ContentHandler must be constructed with a connected database
function ContentHandler() {
	"use strict";
	
	this.displayMainPage = function(req, res, next) {
		"use strict";
		return res.json({"status": "OK"});
	}
}

module.exports = ContentHandler;