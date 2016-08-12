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
		let databaseRoleList;

		const roleListPromise = api.role.list();
		const userPromise = getUserPromise();

		$q.all([roleListPromise, userPromise])
			.then(buildRoleList)
			.then(roleMembership => {
				databaseRoleList = angular.copy(roleMembership);
			});

		vm.saveUser = function(user, roles) {
			vm.isSaving = true;
			const save = user.id ? api.user.update : api.user.create;

			save(user)
				.then((user) => updateRoleMembership(user, roles))
				.then(handleSuccess)
				.catch(handleErrors)
				.finally(() => vm.isSaving = false);
		};

		function getUserPromise() {
			if ($stateParams.user_id) {
				return api.user.get($stateParams.user_id);
			}

			return $q.when({});
		}

		function buildRoleList([roleList, user]) {
			vm.user = user;
			vm.roleList = roleList.map((role) => {
				return {
					name           : role.name,
					hasCurrentUser : role.users.indexOf(user.id) > -1,
				};
			});

			return vm.roleList;
		}

		function updateRoleMembership(user, roles) {
			const rolePromises = [];
			let currentRolePromise;

			for (let i = 0; i < roles.length; i++) {
				if (databaseRoleList[i].hasCurrentUser !== roles[i].hasCurrentUser) {
					currentRolePromise = roles[i].hasCurrentUser
						? removeUserFromRole(roles[i].name, user.id)
						: addUserToRole(roles[i].name, user.id);

					rolePromises.push(currentRolePromise);
				}
			}

			return $q.all([rolePromises]);
		}

		function handleSuccess() {
			vm.status = {
				result  : 'success',
				message : 'Save successful.',
			};
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

		function addUserToRole(roleName, user_id) {
			return api.role.update(roleName, null, [user_id]);
		}

		function removeUserFromRole(roleName, user_id) {
			return api.role.update(roleName, null, null, [user_id]);
		}
	}
})(angular);
