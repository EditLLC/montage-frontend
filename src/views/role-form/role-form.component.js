(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('roleForm', {
			templateUrl  : 'views/role-form/role-form.html',
			controllerAs : 'roleForm',
			controller   : RoleFormController,
		});

	function RoleFormController($scope, $state, $q, $stateParams, api, toast, modalHelper, notFoundHelper) {
		const vm = this;

		let originatorEv;

		vm.formType = getFormType();

		const rolePromise = getRolePromise();
		const usersPromise = api.user.list();

		$q.all([rolePromise, usersPromise])
			.then(buildusers)
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.params = notFoundHelper.buildRoleObject();
				}
			});

		vm.saveRole = function(role, users) {
			vm.isSaving = true;

			const usersToAdd = vm.usersInRole.map(user => user.id);
			const usersToRemove = vm.usersNotInRole.map(user => user.id);

			const savePromise = $stateParams.roleName
				? api.role.update($stateParams.roleName, role.name, usersToAdd, usersToRemove)
				: api.role.create(role.name, usersToAdd);

			savePromise
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

		vm.openMenu = function($mdOpenMenu, ev) {
			originatorEv = ev;
			$mdOpenMenu(ev);
		};

		function getFormType() {
			if (!$stateParams.roleName) {
				vm.isCreateForm = true;
			}

			return $stateParams.roleName ? 'Update' : 'Create';
		}

		function buildusers([role, users]) {
			vm.users = users;
			vm.role = role;

			if (Object.keys(vm.role).length) {
				vm.usersInRole = users.filter(user =>
					role.users.indexOf(user.id) !== -1);
				vm.usersNotInRole = users.filter(user =>
					role.users.indexOf(user.id) === -1);
			} else {
				vm.usersInRole = [];
				vm.usersNotInRole = users;
			}

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
