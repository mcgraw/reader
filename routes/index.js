// Require modules
var SessionHandler = require('./session');
var ContentHandler = require('./content');
var ErrorHandler   = require('./error').errorHandler;

// Export
module.exports = exports = function(app, schemaMiddleware) {

    var sessionHandler = new SessionHandler();
    var contentHandler = new ContentHandler();
    
    // Middleware to access database schemas
    app.use(schemaMiddleware);
    
    // Middleware to see if a user is logged in
    app.use(sessionHandler.isLoggedInMiddleware);
    
    // The main page of the reader
    app.get('/', contentHandler.displayMainPage);
    
    // Login
    app.post('/login', sessionHandler.handleBeginSession);
  
    // Logout
    app.get('/logout', sessionHandler.handleEndSession);
    
    
    // Profile
    // ============================================================
    
    // Accounts
    // ============================================================
    
    // Create a new user and begin a session
    app.post('/users', sessionHandler.handleSignup);
    
    
    // Articles
    // ============================================================
    
    // Create a new article
    app.post('/articles', contentHandler.handleArticleCreation);
    
    // Update an article with the given id
    app.put('/articles/:id', contentHandler.handleArticleUpdate);
    
    // Sections
    // ============================================================
    
    
    // Blocks
    // ============================================================
    
    
     

    // Error handling middleware
    app.use(ErrorHandler);   
}