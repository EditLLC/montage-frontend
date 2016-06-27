(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('toast', toastService);

	function toastService($mdToast) {
		return {
			simple
		};

		function simple(message){
			$mdToast.show(
				$mdToast.simple()
				.textContent(message)
				.action("OK")
			);
		}
	}
})(angular);
