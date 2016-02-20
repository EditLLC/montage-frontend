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


	}
})(angular);
