/**
 * The purpose of this component is to provide a common ancestor for related views.
 *
 * We can check for this common ancestor when we want to mark a
 * single link as "active" for any of this component's children.
 */

(function (angular) {
	'use strict';

	angular
		.module('montage')
		.component('emptyParent', {
			templateUrl: 'views/empty-parent/empty-parent.html',
			controllerAs: 'emptyParent',
			controller: emptyParentController
		});

	function emptyParentController() {

	}
})(angular);
