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
		};

		////////////

		function create(description, policy) {
			return montageHelper.getClient().policy.create(description, policy)
				.then(montageHelper.returnData);
		}

		function get(policy_id) {
			return montageHelper.getClient().policy.get(policy_id)
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

		function remove(policy_id) {
			return montageHelper.getClient().policy.remove(policy_id);
		}
	}
})(angular);
