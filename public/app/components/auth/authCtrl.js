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
			
			if (success) {
				$location.path('/profile/' + Auth.getUserId());
			} else {
				vm.error = resp.reason + ": " + resp.errors[0];
			}
		});
	};
	
	// handle logout
	vm.doLogout = function() {
		Auth.logout();
	};
	
});