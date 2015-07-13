angular.module('authService', ['ng-token-auth'])

// See more information here
// On auth http://code.tutsplus.com/tutorials/token-based-authentication-with-angularjs-nodejs--cms-22543
// https://github.com/lynndylanhurley/ng-token-auth
// For examples http://ng-token-auth-demo.herokuapp.com/
.config(function($authProvider) {
	
	$authProvider.configure( {
		apiUrl:					'/api',
		tokenValidationPath:    '/auth/validate_token',
		emailSignInPath:		'/login'
	});
})

.factory('Auth', function($rootScope, $auth) {
	
	// create auth factory object
	var authFactory = {};

	// handle login
	authFactory.login = function(email, password, callback) {
		$auth.submitLogin({
				email: email,
				password: password
			})
			 .then(function(resp) {
				 callback(true, resp);
			 })
			 .catch(function(resp) {
				 callback(false, resp);
			 });
	}
	
	// handle logout
	authFactory.logout = function() {
		$auth.signOut();	
	}
	
	// check if a user is authorized
	authFactory.isLoggedIn = function() {
		return $auth.userIsAuthenticated();
	}
	
	// get auth username
	authFactory.getUserId = function() {
		return $auth.retrieveData('auth_headers')['uid'];
	}

	return authFactory;
});