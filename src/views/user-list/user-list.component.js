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

		// TODO: implement
		vm.deleteUser = function(user_id) {
			console.log('deleteUser() has not yet been implemented'); // TODO: REMOVE ME
			};
	}
})(angular);
