(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl: 'views/user-list/user-list.html',
			controllerAs: 'userList',
			controller: userListController
		});

	function userListController(api, userService) {
		var vm = this;

		api.user.list()
			.then(userList => vm.userList = userList)
			.then(userList => console.log('userList', userList));

	}
})(angular);
