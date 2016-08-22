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

		vm.delete = function(roleName) {
			vm.isSaving = true;

			modalHelper.confirmDelete('role')
				.then(() => {
					api.role.remove(roleName)
						.then(() => removeRoleFromView(vm.roleList, roleName))
						.then(() => vm.status = 'success')
						.catch(() => vm.status = 'error')
						.finally(() => vm.isSaving = false);
				});
		};

		function removeRoleFromView(roleList, roleName) {
			for (let index = 0; index < roleList.length; index++) {
				if (roleList[index].name === roleName) {
					roleList.splice(index, 1);
					break;
				}
			}
		}
	}
})(angular);
