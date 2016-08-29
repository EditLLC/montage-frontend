(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('modalHelper', modalHelper);

	function modalHelper($mdDialog) {
		const service = {
			confirmDelete,
		};

		return service;

		////////////

		function confirmDelete(recordType = 'item') {
			const confirm = $mdDialog.confirm()
				.title('Delete Confirmation')
				.textContent(`Are you sure you want to delete this ${recordType}?`)
				.ariaLabel('Delete confirmation')
				.ok('Delete')
				.cancel('Cancel');

			return $mdDialog.show(confirm);
		}
	}
})(angular);
