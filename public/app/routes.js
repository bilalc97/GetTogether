// routes module
angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html',
		controller: 'eventCtrl',
		controllerAs: 'events'
	})

	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'	// nick name
	})

	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html'
	})

	.when('/logout', {
		templateUrl: 'app/views/pages/users/logout.html'
	})

	.when('/profile', {
		templateUrl: 'app/views/pages/users/profile.html'
	})

	.when('/eventCreation', {
		templateUrl: 'app/views/pages/eventCreation.html',
		controller: 'eventCtrl',
		controllerAs: 'event'	// nick name
	})

	.otherwise({ redirectTo: '/'});

	// this will make it so that # symbols arent required in the route
	// instead of http://localhost:8000/#/register, it will be http://localhost:8000/register
	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});
});