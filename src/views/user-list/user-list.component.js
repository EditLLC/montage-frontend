(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userList', {
			templateUrl: 'views/user-list/user-list.html',
			controllerAs: 'userList',
			controller: userListController
		});

	function userListController(api, modalHelper, $state) {
		var vm = this;
		vm.userList = api.user.list()
			.then((userList) => vm.userList = userList);

		vm.confirmRemove = function (id) {
 			modalHelper.confirmDelete(id)
				.then(() => api.user.remove(id))
				.then(() => $state.go("user.list", {}, {reload: true}));
		};
	}
})(angular);
