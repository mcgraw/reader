angular.module('readerCtrl', ['authService'])

.controller('readerController', function($rootScope, $location, Auth) {
	var vm = this;
	
	// is the customer logged in
	vm.loggedIn = Auth.isLoggedIn();

	// check login status on every request
	$rootScope.$on('$routeChangeStart', function() {
		vm.loggedIn = Auth.isLoggedIn();
		
		console.log(vm.loggedIn);
		
		// update user info on route change
		// Auth.getUser()
		// 	.success(function(data) {
		// 		vm.user = data;
		// 	});
	});
	
	// check validation messages
	$rootScope.$on('auth:validation-success', function(event, args) {
		console.log("User validation succeeded!");
	});
	
	$rootScope.$on('auth:validation-error', function(event, args) {
		console.log("User validation failed!");
	});

});