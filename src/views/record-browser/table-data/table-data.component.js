(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('tableData', {
			templateUrl: 'views/record-browser/table-data/table-data.html',
			controllerAs: 'tableData',
			controller: tableDataController
		});

	function tableDataController() {
		var vm = this;


	}
})(angular);
