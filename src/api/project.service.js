(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('projectService', projectService);

	function projectService(montageHelper) {
		const service =  {
			get,
		};

		return service;

		////////////

		function get() {
			return montageHelper.getClient().request('project/');
		}
	}
})(angular);
