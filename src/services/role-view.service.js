(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('roleView', roleView);

	function roleView() {
		const service = {
			removeUserFromView,
		};

		return service;

		////////////

		function removeUserFromView(users, user) {
			const index = users.indexOf(user);

			if (index !== -1) {
				users.splice(index, 1);
			}
		}
	}
})(angular);
