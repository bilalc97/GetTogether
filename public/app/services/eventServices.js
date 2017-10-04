angular.module('eventServices', [])

.factory('Event', function($q, $http) {
	eventFactory = {};

	// Event.create(creationData);
	eventFactory.create = function(creationData) {
		return $http.post('/api/events', creationData);
	}

	eventFactory.getAll = function() {
		var deferred = $q.defer(), httpPromise = $http.get('/api/allEvents');

		httpPromise.then(function(response) {
			deferred.resolve(response);
		}, function(error) {
			console.log(error);
		});

		return deferred.promise;
	}

	return eventFactory;
});