(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('recordBrowser', {
			templateUrl: 'views/record-browser/record-browser.html',
			controllerAs: 'recordBrowser',
			controller: recordBrowserController
		});

	function recordBrowserController(api, montageHelper, $scope, $window) {
		var vm = this;

		api.schema.list().then(schemaList => vm.schemaList = schemaList);

		vm.executeQuery = function(query) {
			montageHelper.getClient()
				.execute({ query })
				.then(response => {
					return vm.results = {
						schema: getSchema(query.schema),
						documentList: response.data.query
					};
				});
		};

		function getSchema(schemaName) {
			return vm.schemaList.filter(schema => schema.name === schemaName)[0];
		}
	}
})(angular);
