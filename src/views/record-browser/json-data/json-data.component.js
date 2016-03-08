(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('jsonData', {
			templateUrl: 'views/record-browser/json-data/json-data.html',
			controllerAs: 'jsonData',
			controller: jsonDataController
		});

	function jsonDataController() {
		var vm = this;


	}
})(angular);
