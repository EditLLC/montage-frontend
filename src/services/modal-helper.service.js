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

		function confirmDelete(recordType = 'item', roles) {
			const confirm = $mdDialog.confirm()
				.title('Delete Confirmation')
				.textContent(`Are you sure you want to delete this ${recordType}?`)
				.ariaLabel('Delete confirmation')
				.ok('Delete')
				.cancel('Cancel');

			return $mdDialog.show(confirm);
		}

		function formatString(recordType, roles) {
			let roleName = 'roles';

			if (roles.length < 2) {
				roleName = 'role';
			}
			const formattedString = `${recordType}? It is used by the ${roles} ${roleName}.`;

			return formattedString;
		}
	}
})(angular);
