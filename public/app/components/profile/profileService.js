angular.module('profileService', [])

.factory('Profile', function($http) {
	
	// create a new factory object
	var profileFactory = {};
	
	// get the user profile
	profileFactory.get = function(id) {
		return $http.get('/api/profile/' + id);
	}
	
	return profileFactory;
});