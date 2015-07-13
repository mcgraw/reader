angular.module('readerCtrl', ['authService'])

.controller('readerController', function($rootScope, $location, Auth) {
	var vm = this;
	
	// is the customer logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check login status on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
	});
	
	// log out
	vm.logout = function() {
		Auth.logout()
	};
	
	// authentication state changes
	$rootScope.$on('auth:validation-success', function(event, args) {
		console.log("User validation succeeded!");
		$location.path('/profile/' + Auth.getUserId());
		vm.loggedIn = true;
	});
	
	$rootScope.$on('auth:validation-error', function(event, args) {
		console.log("User validation failed!");
		vm.loggedIn = false;
	});

	$rootScope.$on('auth:logout-success', function(event, args) {
		vm.loggedIn = false;
	});
	
	$rootScope.$on('auth:logout-error', function(event, args) {
	});	
});