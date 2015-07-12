angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider
		// home page route
		.when('/', {
			templateUrl: 'app/components/reader/readerView.html'
		})
		
		// login page
		.when('/login', {
			templateUrl: 'app/components/auth/authView.html',
			controller: 'authController',
			controllerAs: 'auth'
		});
	
	// get rid of the # in the URL
	$locationProvider.html5Mode(true);
});