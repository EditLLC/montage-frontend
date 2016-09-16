(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('toast', toast);

	function toast($mdToast) {
		const service = {
			success,
		};

		return service;

		////////////

		function success(content) {
			return $mdToast.show(
				$mdToast.simple()
					.content(content)
					.textContent(content)
					.position('bottom right')
					.hideDelay(4000)
		); }
	}
})(angular);
