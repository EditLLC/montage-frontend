(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl: 'views/user-list/user-list.html',
			controllerAs: 'userList',
			controller: userListController
		});

	function userListController(api, modalHelper) {
		var vm = this;

		api.user.list()
			.then(userList => vm.userList = userList);

		vm.confirmRemove = function (id) {
			modalHelper.confirmDelete(id)
				.then(() => api.user.remove(id))
				.then(api.user.list())
				// .then(userList => vm.userList = userList);
		};
	}
})(angular);
