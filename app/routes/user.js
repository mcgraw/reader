var UsersDAO = require('../controllers/users').UsersDAO;
var SessionsDAO = require('../controllers/sessions').SessionsDAO;

function UserHandler () {
    "use strict";

    var users = new UsersDAO();
    // var sessions = new SessionsDAO();
   
    this.getProfileData = function(req, res, next) {
        "use strict";
        
        users.findUser(req.db, req.params.id, function(err, user) {
            "use strict";
          
            if (err) next(err);

            res.json(user);
       });      
    }
   
    this.updateProfile = function(req, res, next) {
        "use strict";
      
        if (!req.session_id) throw Error("You need to log in to do that");
        
        next(new Error("Not implemented"));
    }
      
}

module.exports = UserHandler;
