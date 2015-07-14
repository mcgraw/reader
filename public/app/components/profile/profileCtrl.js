angular.module('profileCtrl', ['profileService', 'authService', 'articleService'])

.controller('profileController', function($rootScope, $location, Profile, Article, Auth) {
	var vm = this;
	
	// user profile data
	vm.user = {}
	
	// grab user data on on page load
	Profile.get(Auth.getUserId())
		   .success(function(data) {
			   console.log('viewing profile:');
			   console.log(data);
			   vm.user = data;
		   });
		
	// purchase an article from the profile view (temporary -- buy from article view!)   
	vm.purchaseArticle = function(id) {
		Article.purchase(id)
			   .success(function(data) {
				   console.log('purchased article with user:');
				   console.log(data);
				   vm.user = data;
			   });
	};
	
	// delete an article from the profile view (temporary -- no deleting!)
	vm.deleteArticle = function(id) {
		Article.delete(id)
			   .success(function(data) {
				   console.log('deleted article with user:');
				   console.log(data);
				   vm.user = data;
			   })
	};
	
	// monitor events
	$rootScope.$on('auth:logout-success', function(event, args) {
		$location.path('/');
	});
});