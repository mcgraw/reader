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
    
    // Allow requests to come from different domains in order to develop 
    // a client-independent system. If you do not allow this, you will 
    // trigger a CORS (Cross Origin Request Sharing) error in the web browser.
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });
    
    var apiRouter      = express.Router();
    
    // Middleware to access database schemas
    apiRouter.use(schemaMiddleware);
    
    // Check for a valid token
    apiRouter.get('/auth/validate_token', sessionHandler.handleValidateToken);
    
    // Create a new user and begin a session
    apiRouter.post('/signup', sessionHandler.handleSignup);
    
    // Login
    apiRouter.post('/login', sessionHandler.handleBeginSession);
   
    // Middleware to see if a user is logged in
    apiRouter.use(sessionHandler.isValidTokenMiddleware);
     
    // Test
    apiRouter.get('/test', function(req, res, name) {
        res.json({"message": "ok"});       
    });
    
    // Logout
    apiRouter.delete('/auth/sign_out', sessionHandler.handleEndSession);
    
    // Profile
    // ============================================================
    
    apiRouter.route('/profile/:id')
  
             // Display a user profile
             .get(userHandler.getProfileData)
    
             // Update a user profile
             .post(userHandler.updateProfile);
       
        
    // Accounts (logged in)
    // ============================================================
    
    

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
    
    // The main page of the reader (the catch-all route, registered after all of our routes)
    apiRouter.get('*', contentHandler.displayMainPage);
    
    // Base path
    app.use('/api', apiRouter);
    
    return apiRouter;
}