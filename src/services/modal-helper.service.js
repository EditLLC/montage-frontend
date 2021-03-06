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
			const record = checkInput(recordType, roles);

			const confirm = $mdDialog.confirm()
				.title('Delete Confirmation')
				.textContent(`Are you sure you want to delete this ${record}`)
				.ariaLabel('Delete confirmation')
				.ok('Delete')
				.cancel('Cancel');

			return $mdDialog.show(confirm);
		}

		function checkInput(recordType, roles) {
			let record;

			if (roles) {
				return record = roles.length
					? formatString(recordType, roles)
					: `${recordType}?`;
			}

			return record = `${recordType}?`;
		}

		function formatString(recordType, roles) {
			let roleName = 'roles';

			if (roles.length < 2) {
				roleName = 'role';
			} else if (roles.length === 2) {
				roles = roles.join(' and ');
			} else if (roles.length > 2) {
				roles = `${roles.slice(0, -1).join(', ')}, and ${roles.slice(-1)}`;
			}
			const formattedString = `${recordType}? It is used by the ${roles} ${roleName}.`;

			return formattedString;
		}
	}
})(angular);
