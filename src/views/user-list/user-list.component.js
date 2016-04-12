(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl: 'views/user-list/user-list.html',
			controllerAs: 'userList',
			controller: userListController
		});

	function userListController(api) {
		var vm = this;

		api.user.list()
			.then(userList => vm.userList = userList);

		vm.removeUser = function (user_id) {
			api.user.removeUser(user_id)
			.then (user.splice(index, 1));
			//TODO add a catch for failure of this function and a modal to confirm
		};
	}
})(angular);
