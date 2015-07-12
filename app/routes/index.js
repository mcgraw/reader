// Require modules
var SessionHandler = require('./session');
var UserHandler    = require('./user');
var ContentHandler = require('./content');
var ErrorHandler   = require('./error').errorHandler;

// Export
module.exports = exports = function(app, express, schemaMiddleware) {

    var sessionHandler = new SessionHandler();
    var userHandler    = new UserHandler();
    var contentHandler = new ContentHandler();
    
    var apiRouter      = express.Router();
    
    // Middleware to access database schemas
    apiRouter.use(schemaMiddleware);
    
    // Middleware to see if a user is logged in
    apiRouter.use(sessionHandler.isLoggedInMiddleware);
    
    // The main page of the reader
    apiRouter.get('*', contentHandler.displayMainPage);
    
    // Test
    apiRouter.get('/test', function(req, res, name) {
        res.json({"message": "ok"});       
    });
     
    // Login
    apiRouter.post('/login', sessionHandler.handleBeginSession);
  
    // Logout
    apiRouter.get('/logout', sessionHandler.handleEndSession);
    
    
    // Profile
    // ============================================================
    
    apiRouter.route('/profile/:username')
  
             // Display a user profile
             .get(userHandler.displayProfile)
    
             // Update a user profile
             .post(userHandler.updateProfile);
       
        
    // Accounts
    // ============================================================
    
    // Create a new user and begin a session
    apiRouter.post('/accounts', sessionHandler.handleSignup);
    

    // Articles
    // ============================================================
    
    // Create a new article
    apiRouter.post('/articles', contentHandler.handleArticleCreation);
    
    // Update an article with the given id
    apiRouter.put('/articles/:id', contentHandler.handleArticleUpdate);
    
    
    // Sections
    // ============================================================
    
    // Create a new section
    apiRouter.post('/articles/:id/sections', contentHandler.handleSectionCreation);
    
    apiRouter.route('/articles/:article_id/sections/:section_id')
    
             // Retrieve section
             .get(contentHandler.displaySection)  
             
             // Update section
             .put(contentHandler.handleSectionUpdate)   
            
             // Delete section from the article
             .delete(contentHandler.handleSectionDelete);    
    
     
    // Blocks
    // ============================================================
    
    // Create a new block
    apiRouter.post('/sections/:id/block', contentHandler.handleBlockCreation);
    
    // Delete a block
    apiRouter.delete('/sections/:section_id/block/:block_id', contentHandler.handleBlockDelete);

    // Error handling middleware
    apiRouter.use(ErrorHandler);  
    
    // Base path
    app.use('/api', apiRouter);
    
    return apiRouter;
}