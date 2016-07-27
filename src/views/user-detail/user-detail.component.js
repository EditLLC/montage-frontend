(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userDetail', {
			templateUrl: 'views/user-detail/user-detail.html',
			controllerAs: 'userDetail',
			controller: userDetailController
		});

	function userDetailController($stateParams, api) {
		const vm = this;

		api.user.get($stateParams.user_id).then(user => vm.user = user);
	}
})(angular);
