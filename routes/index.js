// Require modules
var SessionHandler = require('./session');
var ContentHandler = require('./content');
var ErrorHandler   = require('./error').errorHandler;

// Export
module.exports = exports = function(app, db) {

    var sessionHandler = new SessionHandler();
    var contentHandler = new ContentHandler();
    
    // The main page of the reader
    app.get('/', db, contentHandler.displayMainPage);
    
    // User handling
    // TODO: display signup page
    
    // Create a new user and begin a session
    app.post('/users', db, sessionHandler.handleSignup);
  
    // Login
    app.post('/login', db, sessionHandler.handleBeginSession);
  
    // Logout
    app.get('/logout', db, sessionHandler.handleEndSession);
   
    // Welcome page
    // TODO: display welcome page
    
    // Display article
    // TODO: display article page        

    // Error handling middleware
    app.use(ErrorHandler);   
}