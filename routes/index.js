// Require modules
var ContentHandler = require('./content');
var UserHandler    = require('./users');
var ErrorHandler   = require('./error').errorHandler;

// Export
module.exports = exports = function(app, db) {

    var contentHandler = new ContentHandler(db);
    var userHandler = new UserHandler(db);
    
    // The main page of the reader
    app.get('/', db, contentHandler.displayMainPage);
    
    // User handling
    // TODO: display signup page
    app.post('/users', db, userHandler.handleAccountCreation)

    // Welcome page
    // TODO: display welcome page
    
    // Display article
    // TODO: display article page
    
    // Error handling middleware
    app.use(ErrorHandler);   
}