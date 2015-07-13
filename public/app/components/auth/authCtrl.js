angular.module('authCtrl', ['authService'])

.controller('authController', function($rootScope, $location, Auth) {
	var vm = this;
	
	// default login data
	vm.loginData = {
		email: 'david@xmcgraw.com',
		password: 'rando1234'
	}
	
	// handle login
	vm.doLogin = function() {
		vm.processing = true;
		
		// clear any errors
		vm.error = '';
		
		// call our API
		Auth.login(vm.loginData.email, vm.loginData.password, function(success, resp) {
			vm.processing = false;
			
			if (!success) {
				vm.error = resp.reason + ": " + resp.errors[0];
			}
		});
	};
	
	// handle logout
	vm.doLogout = function() {
		Auth.logout();
	};
	
	// state changes	
	$rootScope.$on('auth:logout-success', function(event, args) {
		console.log("User has logged out!");
		vm.processing = false;
		$location.path('/');
	});
	
	$rootScope.$on('auth:logout-error', function(event, args) {
		console.log("User failed to log out!");
	});
	
});