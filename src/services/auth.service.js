(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('authService', authService);

	function authService($cookies, $state, montage) {
		var _user;

		return {
			isAuthenticated,
			getCurrentUser,
			setCurrentUser,
			login,
			logout
		};

		////////////

		function isAuthenticated() {
			if(!_user) {
				_user = $cookies.getObject('user');
			}

			return !!_user;
		}

		function getCurrentUser() {
			return _user;
		}

		function setCurrentUser(user) {
			angular.extend(_user, user);
			$cookies.putObject('user', _user);
		}

		function login(username, password) {
			var client = new montage.Client(MONTAGE_PROJECT);
			client.protocol = MONTAGE_PROTOCOL;
			client.host = MONTAGE_HOST;

			return client.authenticate(username, password)
				.then(response => {
					var user = response.data;

					_user = user;
					$cookies.putObject('user', user);
				});
		}

		function logout() {
			_user = null;
			$cookies.put('user', null);

			$state.go('login');
		}
	}
})(angular);
