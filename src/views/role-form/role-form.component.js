(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleForm', {
			templateUrl  : 'views/role-form/role-form.html',
			controllerAs : 'roleForm',
			controller   : RoleFormController,
		});

	function RoleFormController($scope, $state, $q, $stateParams, api, toast, notFoundHelper) {
		const vm = this;

		vm.formType = getFormType();

		const rolePromise = getRolePromise();
		const userListPromise = api.user.list();

		$q.all([rolePromise, userListPromise])
			.then(buildUserList)
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildRoleObject();
				}
			});

		vm.saveRole = function(role, users) {
			vm.isSaving = true;
			const save = role.name ? api.role.update : api.role.create;

			save(role)
				.then(() => $state.go('role.list'))
				.then(() => toast.success('Successfully saved.'))
				.catch(handleErrors)
				.finally(() => vm.isSaving = false);
		};

		function getRolePromise() {
			if ($stateParams.roleName) {
				return api.role.get($stateParams.roleName);
			}

			return $q.when({});
		}

		function getFormType() {
			if (!$stateParams.roleName) {
				vm.isCreateForm = true;
			}

			return $stateParams.roleName ? 'Update' : 'Create';
		 }

		function buildUserList([role, users]) {
			vm.users = users;
			vm.role = role;

			return vm.role;
		}

		function handleErrors(err) {
			err.text().then(text => {
				text = JSON.parse(text);

				if (!(text.errors
					&& text.errors[0]
					&& text.errors[0].meta
					&& text.errors[0].meta.details
					&& text.errors[0].meta.details.name
				)) return;

				const error = text.errors[0].meta.details.name[0];

				if (error) {
					vm.status = {
						result  : 'duplicateRole error',
						message : error,
					};
				} else {
					vm.status = {
						result  : 'error',
						message : 'There was an error saving your changes. Please try again.',
					};
				}

				$scope.$digest();
			});
		}
	}
})(angular);
