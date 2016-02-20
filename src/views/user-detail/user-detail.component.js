(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl: 'views/user-detail/user-detail.html',
			controllerAs: 'userDetail',
			controller: userDetailController
		});

	function userDetailController() {
		var vm = this;


	}
})(angular);
