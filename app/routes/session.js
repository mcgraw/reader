var UsersDAO = require('../controllers/users').UsersDAO
var SessionsDAO = require('../controllers/sessions').SessionsDAO;

var config	= require('../../config');
var jwt		= require('jsonwebtoken');

function SessionHandler () {
    "use strict";

    var users = new UsersDAO();
    var sessions = new SessionsDAO();
   
    this.isValidTokenMiddleware = function(req, res, next) {
        
        // Check header, url, or post param for a token
        var token = req.body.token || req.query.token || req.headers['access-token'];
       
        // Decode it
        if (token) {
            // verify secret, check expiration
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({ message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // no token, return forbidden
            return res.status(403).send({ message: 'No token provided.' })
        }  
    }
    
    this.handleValidateToken = function(req, res, next) {
        
        // Check header, url, or post param for a token
        var token = req.body.token || req.query.token || req.headers['access-token'];
      
        // Decode it
        if (token) {
            // verify secret, check expiration
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    return res.status(403).send({ message: 'Failed to authenticate token.' });
                } else {
                    return res.send({ data: { id: token }});
                }
            });
        } else {
            // no token, return forbidden
            return res.status(403).send({ message: 'No token provided.' })
        }  
    }
    
     this.handleBeginSession = function(req, res, next) {
        "use strict";
        
        var email = req.body.email;
        var password = req.body.password;
		
        sessions.authenticateSession(req.db, res, password, email, function(err, data) {
            "use strict";
            
            if (err)  {return res.status(500).send({ message: err }); }
            
            res.send(data);
        });       
    }
    
    this.handleEndSession = function(req, res, next) {
        "use strict";
        res.send({message: "Session ended" });
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
                    // this was a duplicate
                    if (err.code == '11000') {
                        return res.status(403).send({ message: "Username already in use. Please choose another"});   
                    } else {
                        return res.send(err);
                    }
                }
                
                sessions.authenticateSession(req.db, password, email, function(err, data) {
                    res.status(201).send(data);
                });  
            });
        }
        else {
            return res.status(500).send({message: "Failed to validate"}); 
        }
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
