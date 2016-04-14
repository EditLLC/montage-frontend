(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleList', {
			templateUrl: 'views/role-list/role-list.html',
			controllerAs: 'roleList',
			controller: roleListController
		});

	function roleListController(api) {
		var vm = this;

		api.role.list().then(roleList => vm.roleList = roleList);

		// TODO: implement
		vm.delete = function(roleName) {
			console.log('Role deletion is not implemented');
		};
	}
})(angular);
