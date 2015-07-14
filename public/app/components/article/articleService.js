angular.module('articleService', [])

.factory('Article', function($http) {
	
	// create a new factory object
	var articleFactory = {};
	
	// purchase an article
	articleFactory.purchase = function(id) {
		return $http.post('/api/articles/' + id + '/purchase');
	}
	
	// get a single article
	articleFactory.get = function(id) {
		return $http.get('/api/articles/' + id);
	};
	
	// create a new article
	articleFactory.create = function(articleData) {
		return $http.post('/api/articles/', articleData);
	};
	
	// update an article
	articleFactory.update = function(id, articleData) {
		return $http.put('api/articles/' + id, articleData);
	};
	
	// delete an article
	articleFactory.delete = function(id) {
		return $http.delete('/api/articles/' + id);
	};
	
	return articleFactory;
});