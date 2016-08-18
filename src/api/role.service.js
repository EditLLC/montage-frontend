(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('roleService', roleService);

	function roleService(montageHelper) {
		return {
			create,
			get,
			list,
			update,
			remove,
		};

		////////////

		function create(role, users) {
			return montageHelper.getClient().roles.create(role, users)
				.then(montageHelper.returnData);
		}

		function get(roleName) {
			return montageHelper.getClient().roles.get(roleName)
				.then(montageHelper.returnData);
		}

		function list() {
			return montageHelper.getClient().roles.list()
				.then(montageHelper.returnData);
		}

		function update(role, name, addUsers, removeUsers) {
			return montageHelper.getClient().roles.update(role, name, addUsers, removeUsers)
				.then(montageHelper.returnData);
		}

		function remove(roleName) {
			return montageHelper.getClient().roles.remove(roleName);
		}
	}
})(angular);
