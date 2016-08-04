(angular => {
	'use strict';

	angular
		.module('montage')
		.factory('constants', constants);

	function constants() {
		const primaryColor = '#01579B';

		return {
			primaryColor,
		}
	}
})(angular);
