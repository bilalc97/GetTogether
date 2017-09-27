// Main app configuration file, angular app module
// app name, [dependencies]
angular.module('userApp', ['appRoutes', 'userControllers', 'userServices', 'ngAnimate', 'mainController', 'authServices', 'eventControllers', 'eventServices'])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});