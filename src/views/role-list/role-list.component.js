(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleList', {
			templateUrl: 'views/role-list/role-list.html',
			controllerAs: 'roleList',
			controller: roleListController
		});

	function roleListController() {
		var vm = this;

		// TODO: get the roleList from the montage backend
		vm.roleList = [{
			name: 'Admin',
			memberCount: 8
		}];

		// TODO: implement
		vm.delete = function(roleName) {
			console.log('Role deletion is not implemented');
		};
	}
})(angular);
