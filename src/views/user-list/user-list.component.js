(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl: 'views/user-list/user-list.html',
			controllerAs: 'userList',
			controller: userListController
		});

	function userListController($q, api) {
		var vm = this;
		const roleListPromise = api.role.list();
		const userListPromise = api.user.list();
		let userMap = {};

		$q.all([roleListPromise, userListPromise])
			.then(([roleList, userList]) => {
				vm.userList = userList;

			});

		// TODO: implement
		vm.deleteUser = function(user_id) {
			console.log('deleteUser() has not yet been implemented'); // TODO: REMOVE ME
		};
	}
})(angular);
