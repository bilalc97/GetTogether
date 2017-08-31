// routes module
angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about', {
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'	// nick name
	})

	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html'
	})

	.otherwise({ redirectTo: '/'});

	// this will make it so that # symbols arent required in the route
	// instead of http://localhost:8000/#/register, it will be http://localhost:8000/register
	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});
});