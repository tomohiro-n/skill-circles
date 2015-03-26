/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="main/main.controller.ts" />
/// <reference path="service/d3Service.ts" />
/// <reference path="../components/navbar/navbar.controller.ts" />

module skillCircles {
	'use strict';

	angular.module('skillCircles', ['ngResource', 'ngRoute', 'ui.bootstrap'])
		.service('d3Service', D3Service)
		.controller('MainCtrl', MainCtrl)
		.controller('NavbarCtrl', NavbarCtrl)
		.config(($locationProvider: ng.ILocationProvider) => {
			$locationProvider.html5Mode(true);
		})
		.config(($routeProvider: ng.route.IRouteProvider) => {
			$routeProvider
				.when('/', {
					templateUrl: 'app/main/main.html',
					controller: 'MainCtrl'
				})
				.otherwise({
					redirectTo: '/'
				});
		});
}
