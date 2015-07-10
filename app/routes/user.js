var UsersDAO = require('../controllers/users').UsersDAO
  , SessionsDAO = require('../controllers/sessions').SessionsDAO;

function UserHandler () {
    "use strict";

    var users = new UsersDAO();
    // var sessions = new SessionsDAO();
   
   this.displayProfile = function(req, res, next) {
       "use strict";
       
       var username = req.params.username;
       
       users.findUser(req.db, username, function(err, user) {
          "use strict";
          
          if (err) next(err);
          
          var response = {
            "name": user.name,
            "photo_url": user.photo_url,
            "purchased": user.purchased,
            "authored": user.authored
          };
          res.json(response);
       });      
   }
   
   this.updateProfile = function(req, res, next) {
        "use strict";
      
        if (!req.session_id) throw Error("You need to log in to do that");
        
        next(new Error("Not implemented"));
   }
      
}

module.exports = UserHandler;
