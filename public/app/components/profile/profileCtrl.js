angular.module('profileCtrl', ['profileService', 'authService'])

.controller('profileController', function($rootScope, $location, Profile, Auth) {
	var vm = this;
	
	// user profile data
	vm.user = {}
	
	// grab user data on on page load
	Profile.get(Auth.getUserId())
		   .success(function(data) {
			   console.log('viewing profile:');
			   console.log(data);
			   vm.user = data;
		   })
	
	// monitor events
	$rootScope.$on('auth:logout-success', function(event, args) {
		$location.path('/');
	});
});