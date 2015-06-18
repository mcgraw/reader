var UsersDAO = require('../users').UsersDAO
  , SessionsDAO = require('../sessions').SessionsDAO;

function SessionHandler () {
    "use strict";

    var users = new UsersDAO();
    var sessions = new SessionsDAO();
   
    this.isLoggedInMiddleware = function(req, res, next) {
        var session_id = req.cookies.session;
        sessions.getSessionUserObjectId(req.db, session_id, function(err, session) {
            "use strict";
            
            if (!err && session_id) {
                req.session_id = session_id;
            } 
            return next();
        });  
    }
    
    this.handleSignup = function(req, res, next) {
        "use strict";

        var email = req.body.email;
        var name = req.body.name;
        var username = req.body.username;
        var password = req.body.password;
        var verify = req.body.verify;
       
        // set these up in case we have an error case
        var errors = {'email': email};
        if (validateSignup(password, verify, email, errors)) {
            users.addUser(req.db, password, email, name, username, function(err, user) {
                "use strict";

                if (err) {
                    console.log("Error: " + err.code);
                    // this was a duplicate
                    if (err.code == '11000') {
                        // errors['username_error'] = "Username already in use. Please choose another";
                        // return res.render("signup", errors);
                        return res.json({"error": { "code": 500, "message": "Username already in use. Please choose another"}});   
                    }
                    // this was a different error
                    else {
                        return next(err);
                    }
                }

                res.statusCode = 201;
                startSession(req, res, next, user['email']);
            });
        }
        else {
            console.log("user did not validate");
            // return res.render("signup", errors);
             return res.json({"error": { "code": 500, "message": "Failed to validate"}}); 
        }
    }
    
    this.handleBeginSession = function(req, res, next) {
        "use strict";
        
        var email = req.body.email;
        var password = req.body.password;
        
        users.validateLogin(req.db, password, email, function(err, user) {
            "use strict";
            
            if (user) {
                startSession(req, res, next, user['email']);
            } else {
                return res.json({"error": { "code": 500, "message": err}});   
            }
        });       
    }
    
    this.handleEndSession = function(req, res, next) {
        "use strict";
        
        var session_id = req.cookies.session;
        console.log(session_id);
        
        sessions.endSession(req.db, session_id, function(err) {
            "use strict";
            
            res.cookie('session', '');
            return res.json({"message": "session ended"});
        });
    }
    
    function startSession(req, res, next, email) {
        sessions.startSession(req.db, email, function(err, session_id) {
            "use strict";

            if (err) return next(err);

            res.cookie('session', session_id); 
            // return res.redirect('/welcome');
            return res.json({"message": "Session started"}); 
        });
    }
            
    function validateSignup(password, verify, email, errors) {
        "use strict";
        var PASS_RE = /^.{3,20}$/;
        var EMAIL_RE = /^[\S]+@[\S]+\.[\S]+$/;

        errors['password_error'] = "";
        errors['verify_error'] = "";
        errors['email_error'] = "";

        if (!PASS_RE.test(password)) {
            errors['password_error'] = "invalid password.";
            return false;
        }
        if (password != verify) {
            errors['verify_error'] = "password must match";
            return false;
        }
        if (email != "") {
            if (!EMAIL_RE.test(email)) {
                errors['email_error'] = "invalid email address";
                return false;
            }
        }
        return true;
    }
}

module.exports = SessionHandler;
