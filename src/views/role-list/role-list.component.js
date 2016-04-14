(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleList', {
			templateUrl: 'views/role-list/role-list.html',
			controllerAs: 'roleList',
			controller: roleListController
		});

	function roleListController(api, modalHelper) {
		var vm = this;

		api.role.list().then(roleList => vm.roleList = roleList);

		vm.delete = function(roleName) {
			modalHelper.confirmDelete('role')
				.then(() => api.role.remove(roleName))
				.then(() => {
					var index;

					for(var i = 0; i < vm.roleList.length; i++) {
						if(vm.roleList[i].name === roleName) {
							index = i;
							break;
						}
					}

					if(index) {
						vm.roleList.splice(index, 1);
					}
				});
		};
	}
})(angular);
