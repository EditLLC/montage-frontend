(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('userForm', {
			templateUrl  : 'views/user-form/user-form.html',
			controllerAs : 'userForm',
			controller   : UserFormController,
		});

	function UserFormController($scope, $state, $q, $stateParams, api, toast, notFoundHelper) {
		const vm = this;
		let databaseRoleList;

		vm.formType = getFormType();

		const roleListPromise = api.role.list();
		const userPromise = getUserPromise();

		$q.all([roleListPromise, userPromise])
			.then(buildRoleList)
			.then(roleMembership => {
				databaseRoleList = angular.copy(roleMembership);
			})
			.then(() => vm.isFound = true)
			.catch(error => {
				if (notFoundHelper.checkNotFound(error)) {
					vm.notFoundOptions = notFoundHelper.getUserOptions();
				}
			});

		vm.saveUser = function(user, roles) {
			vm.isSaving = true;
			const save = user.id ? api.user.update : api.user.create;

			save(user)
				.then((user) => updateRoleMembership(user, roles))
				.then(() => $state.go('user.detail', {user_id: $stateParams.user_id}))
				.then(() => toast.success('Successfully saved.'))
				.catch(handleErrors)
				.finally(() => vm.isSaving = false);
		};

		vm.cancel = function() {
			$state.go('user.detail', {user_id: $stateParams.user_id})
		};

		function getUserPromise() {
			if ($stateParams.user_id) {
				return api.user.get($stateParams.user_id);
			}

			return $q.when({});
		}

		function getFormType() {
			if (!$stateParams.user_id) {
				vm.isCreateForm = true;
			}

			return $stateParams.user_id ? 'Update' : 'Create';
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
						? addUserToRole(roles[i].name, user.id)
						: removeUserFromRole(roles[i].name, user.id);

					rolePromises.push(currentRolePromise);
				}
			}

			return $q.all(rolePromises);
		}

		function addUserToRole(roleName, user_id) {
			return api.role.update(roleName, null, [user_id]);
		}

		function removeUserFromRole(roleName, user_id) {
			return api.role.update(roleName, null, null, [user_id]);
		}

		function handleErrors(err) {
			err.text().then(text => {
				text = JSON.parse(text);

				if (!(text.errors
					&& text.errors[0]
					&& text.errors[0].meta
					&& text.errors[0].meta.details
					&& text.errors[0].meta.details.email
				)) return;

				const error = text.errors[0].meta.details.email[0];

				if (error) {
					vm.status = {
						result  : 'duplicateEmail error',
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
