angular.module('readerCtrl', [])

// See more information here
// https://github.com/lynndylanhurley/ng-token-auth
.config(function($authProvider) {
	
	// $authProvider.configure( {
		
	// });
})

.controller('readerController', function($rootScope, $location) {
	var vm = this;
	
	// is the customer logged in
	// vm.loggedIn = Auth.isLoggedIn();
	
	// check login status on every request
	$rootScope.$on('$routeChangeStart', function() {
		// vm.loggedIn = authIsLoggedIn();
		
		// update user info on route change
		// Auth.getUser()
		// 	.success(function(data) {
		// 		vm.user = data;
		// 	});
	});
});