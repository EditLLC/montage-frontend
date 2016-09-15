(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('recordBrowser', {
			templateUrl: 'views/record-browser/record-browser.html',
			controllerAs: 'recordBrowser',
			controller: recordBrowserController
		});

	function recordBrowserController(api, montageHelper) {
		var vm = this;

		api.schema.list().then(schemaList => vm.schemaList = schemaList);

		vm.executeQuery = function(query) {
			montageHelper.getClient()
				.execute({ query })
				.then(response => {
					const queryResults = response.data.query;
					vm.error = queryResults.error;
					vm.dataExists = !!queryResults.length;

					return vm.results = {
						schema: getSchema(query.schema),
						documentList: queryResults
					};
				});
		};

		function getSchema(schemaName) {
			return vm.schemaList.filter(schema => schema.name === schemaName)[0];
		}
	}
})(angular);
