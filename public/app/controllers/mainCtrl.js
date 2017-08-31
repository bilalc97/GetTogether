angular.module('mainController', ['authServices'])

.controller('mainCtrl', function(Auth, $timeout, $location) {
	var app = this;

	this.doLogin = function(loginData) {
		app.loading = true;
		app.errorMsg = false;
		Auth.login(app.loginData).then(function(data) {
			if (data.data.success) {
				app.loading = false;
				// Create success message
				app.successMsg = data.data.message + '...Redirecting';
				// Redirect to home page
				$timeout(function() {
					$location.path('/about');
				}, 2000);
			} else {
				app.loading = false;
				// Create error message
				app.errorMsg = data.data.message;
			}
		});
	};


});