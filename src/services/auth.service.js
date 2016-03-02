(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('authService', authService);

	function authService(montage, $cookies, $state) {
		var _user;

		return {
			isAuthenticated,
			getCurrentUser,
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

		function login(credentials) {
			return montage.auth(credentials)
				.then(user => {
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
