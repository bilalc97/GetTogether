angular.module('eventServices', [])

.factory('Event', function($http) {
	eventFactory = {};

	// Event.create(creationData);
	eventFactory.create = function(creationData) {
		console.log(creationData)
		return $http.post('/api/events', creationData);
	}
	return eventFactory;
});