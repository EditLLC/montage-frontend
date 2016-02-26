(function(angular) {
	'use strict';

	angular
		.module('montage', [
			'ngMaterial',
			'ui.router'
		])
		.constant('montageData', window.Montage);
})(angular);
