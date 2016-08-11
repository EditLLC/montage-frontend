(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userForm', {
			templateUrl  : 'views/user-form/user-form.html',
			controllerAs : 'userForm',
			controller   : UserFormController,
		});

	function UserFormController($q, $stateParams, api) {
		const vm = this;
		const roleListPromise = api.role.list();
		let databaseRoleList;
		let userPromise;

		serveAddOrCreateForm();

		$q.all([roleListPromise, userPromise])
			.then(buildRoleMembership);

		vm.saveUser = function(user, roles) {
			vm.isSaving = true;
			const save = user.id ? api.user.update : api.user.create;

			save(user)
				.then((user) => updateUsersRoleMembership(user, roles))
				.then(() => returnSuccess())
				.catch((err) => handleErrors(err))
				.finally(() => vm.isSaving = false);
		};

		function serveAddOrCreateForm() {
			if ($stateParams.user_id) {
				vm.pageTitle = 'Update User';
				userPromise = api.user.get($stateParams.user_id);
			} else {
				vm.pageTitle = 'Create User';
				userPromise = $q.when({});
			}
		}

		function buildRoleMembership([roleList, user]) {
			vm.user = user;
			vm.roleList = roleList.map((role) => {
				return {
					name           : role.name,
					hasCurrentUser : role.users.indexOf(user.id) > - 1,
				};
			});
			vm.roleLabel = vm.roleList.length > 1 ? 'Roles' : 'Role';

			databaseRoleList = angular.copy(vm.roleList);
		}

		function updateUsersRoleMembership(user, roles) {
			const rolePromises = [];

			for (let i = 0; i < roles.length; i++) {
				if (databaseRoleList[i].hasCurrentUser
					!== roles[i].hasCurrentUser) {
					if (roles[i].hasCurrentUser) {
						updateRoles(roles[i].name, [user.id], 'add');
					} else {
						updateRoles(roles[i].name, [user.id], 'remove');
					}
				}
			}

			return $q.all([rolePromises]);
		}

		function returnSuccess() {
			vm.status = {
				result  : 'success',
				message : 'Save successful.',
			};

			return vm.status;
		}

		function handleErrors(err) {
			err.text().then(text => {
				const error = JSON.parse(text).errors[0].meta.details.email[0];

				if (error) {
					vm.status = {
						result  : 'duplicateEmail error',
						message : 'Email address is already in use. Please use another.',
					};

					return vm.status;
				}

				vm.status = {
					result  : 'error',
					message : 'There was an error saving your changes. Please try again.',
				};

				return vm.status;
			});
		}

		function updateRoles(roleName, user_id, addOrRemove) {
			const roleList = [];

			if (addOrRemove === 'add') {
				roleList.push(api.role.update(roleName, null, user_id));

				return roleList;
			}

			roleList.push(api.role.update(roleName, null, null, user_id));

			return roleList;
		}
	}
})(angular);
