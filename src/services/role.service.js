(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('roleService', roleService);

	function roleService($q) {
		return {
			get
		};

		////////////

		// TODO: implement
		function get(roleName) {
			return $q.when({
				name: roleName,
				permissions: {
					members: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					roles: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					accessKeys: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					scheduler: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					data: {
						canView: true,
						canChange: true,
						canDelete: true
					}
				}
			});
		}
	}
})(angular);
