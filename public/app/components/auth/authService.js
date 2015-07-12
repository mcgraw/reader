angular.module('authService', ['ng-token-auth'])

// See more information here
// https://github.com/lynndylanhurley/ng-token-auth
.config(function($authProvider) {
	
	$authProvider.configure( {
		apiUrl:					'/api',
		tokenValidationPath:    '/auth/validate_token',
		emailSignInPath:		'/api/login'
	});
})

.factory('Auth', function($rootScope, $auth) {
	
	// create auth factory object
	var authFactory = {};
	
	// monitor the login state
	$rootScope.isLoggedIn = false

	// handle login
	authFactory.login = function(email, password) {
		$auth.submitLogin(email, password)
			 .then(function(resp) {
				 console.log("logged in!");
			 })
			 .catch(function(resp) {
				 console.log("failed to login!");
			 });
	}
	
	// check if a user is authorized
	authFactory.isLoggedIn = function() {
		return $auth.userIsAuthenticated();
	}

	return authFactory;
});