(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('recordBrowser', {
			templateUrl: 'views/record-browser/record-browser.html',
			controllerAs: 'recordBrowser',
			controller: recordBrowserController
		});

	function recordBrowserController(api) {
		var vm = this;

		api.schema.list().then(schemaList => vm.schemaList = schemaList);

		vm.executeQuery = function(query) {
			var schema = vm.schemaList.filter(schema => query.schema === schema.name)[0];

			if(!schema) {
				throw new Error("Schema not found.");
			}

			api.document.list(query.schema)
				.then(documentList => { vm.results = { schema: schema.fields, documentList }});
		};
	}
})(angular);
