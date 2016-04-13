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
			console.log(user_id);
			api.user.remove(user_id)
			.then ((user) => console.log(user.id));
			//TODO add a catch for failure of this function and a modal to confirm
		};
	}
})(angular);
