(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('utils', utilService);

	function utilService() {
		return {
			makeDictionary,
		};

		////////////

		function makeDictionary(arr, index = 'id') {
			const dictionary = {};

			arr.forEach(element => dictionary[element[index]] = element);

			return dictionary;
		}
	}
})(angular);
