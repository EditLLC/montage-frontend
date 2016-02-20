(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleDetail', {
			templateUrl: 'views/role-detail/role-detail.html',
			controllerAs: 'roleDetail',
			controller: roleDetailController
		});

	function roleDetailController() {
		var vm = this;


	}
})(angular);
