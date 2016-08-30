(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleList', {
			templateUrl  : 'views/role-list/role-list.html',
			controllerAs : 'roleList',
			controller   : RoleListController,
		});

	function RoleListController(api, modalHelper) {
		const vm = this;

		api.role.list().then(roleList => vm.roleList = roleList);
	}
})(angular);
