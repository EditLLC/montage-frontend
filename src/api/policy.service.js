(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('policyService', policyService);

	function policyService(montageHelper) {
		return {
			create,
			get,
			list,
			update,
			remove,
			checkPermission,
		};

		////////////

		function create(description, policy) {
			return montageHelper.getClient().policy.create(description, policy)
				.then(montageHelper.returnData);
		}

		function get(policy) {
			return montageHelper.getClient().policy.get(policy)
				.then(montageHelper.returnData);
		}

		function list() {
			return montageHelper.getClient().policy.list()
				.then(montageHelper.returnData);
		}

		function update(policy_id, description, policy) {
			return montageHelper.getClient().policy.update(policy_id, description, policy)
				.then(montageHelper.returnData);
		}

		function remove(policy) {
			return montageHelper.getClient().policy.remove(policy);
		}

		function checkPermission(action, resource) {
			return montageHelper.getClient().policy.checkPermission(action, resource)
				.then(montageHelper.returnData);
		}
	}
})(angular);
