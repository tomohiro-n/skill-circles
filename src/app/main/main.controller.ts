/// <reference path="../../../.tmp/typings/tsd.d.ts" />
/// <reference path="../service/d3Service.ts" />

module skillCircles {
	'use strict';

	export class MainCtrl {
		/* @ngInject */
		constructor (
			$scope: ng.IScope,
			d3Service : D3Service
		) {
			d3Service.drawCircles();
		}
	}

}
