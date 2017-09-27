angular.module('eventControllers', ['eventServices'])

.controller('eventCtrl', function($http, $timeout, $location, Event) {
	var app = this;

	this.createEvent = function(creationData) {
		app.loading = true;
		app.errorMsg = false;
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
	};
});