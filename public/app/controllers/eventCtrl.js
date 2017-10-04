angular.module('eventControllers', ['eventServices'])

.controller('eventCtrl', function($http, $timeout, $location, $scope, Event, Auth) {
	var app = this;

	this.createEvent = function(creationData) {
		app.loading = true;
		app.errorMsg = false;
		Auth.getUser().then(function(data) {
			app.creationData.creator = data.data.username;
		}).then(function() {
			Event.create(app.creationData).then(function(data) {
				if (data.data.success) {
					app.loading = false;
					app.successMsg = data.data.message + '...Redirecting';
					$timeout(function() {
						$location.path('/');
					}, 2000);
				} else {
					app.loading = false;
					app.errorMsg = data.data.message;
				}
			});
		});
	};

	$scope.list = {};
	Event.getAll().then(function(response) {
		$scope.list = response.data;
	}, function(error) {
		console.error(error);
	});

});