// Require modules
var SessionHandler = require('./session');
var UserHandler    = require('./user');
var ContentHandler = require('./content');
var ErrorHandler   = require('./error').errorHandler;

// Export
module.exports = exports = function(app, schemaMiddleware) {

    var sessionHandler = new SessionHandler();
    var userHandler    = new UserHandler();
    var contentHandler = new ContentHandler();
    
    // Middleware to access database schemas
    app.use(schemaMiddleware);
    
    // Middleware to see if a user is logged in
    app.use(sessionHandler.isLoggedInMiddleware);
    
    // The main page of the reader
    app.get('/', contentHandler.displayMainPage);
    
    // Test
    app.get('/test', function(req, res, name) {
        res.json({"message": "ok"});       
    });
     
    // Login
    app.post('/login', sessionHandler.handleBeginSession);
  
    // Logout
    app.get('/logout', sessionHandler.handleEndSession);
    
    
    // Profile
    // ============================================================
    
    // Display a user profile
    app.get('/profile/:username', userHandler.displayProfile);
    
    // Update a user profile
    app.post('/profile/:username', userHandler.updateProfile);
       
        
    // Accounts
    // ============================================================
    
    // Create a new user and begin a session
    app.post('/accounts', sessionHandler.handleSignup);
    

    // Articles
    // ============================================================
    
    // Create a new article
    app.post('/articles', contentHandler.handleArticleCreation);
    
    // Update an article with the given id
    app.put('/articles/:id', contentHandler.handleArticleUpdate);
    
    
    // Sections
    // ============================================================
    
    // Create a new section
    app.post('/articles/:id/sections', contentHandler.handleSectionCreation);
    
    // Retrieve section
    app.get('/articles/:article_id/sections/:section_id', contentHandler.displaySection);    
     
    // Update section
    app.put('/articles/:article_id/sections/:section_id', contentHandler.handleSectionUpdate);    
    
    // Delete section from the article
    app.delete('/articles/:article_id/sections/:section_id', contentHandler.handleSectionDelete);    
    
     
    // Blocks
    // ============================================================
    
    // Create a new block
    app.post('/sections/:id/block', contentHandler.handleBlockCreation);
    
    // Delete a block
    app.delete('/sections/:section_id/block/:block_id', contentHandler.handleBlockDelete);

    // Error handling middleware
    app.use(ErrorHandler);   
}