(function(angular) {
	'use strict';

	angular
		.module('montage')
		.config(function($mdThemingProvider) {
			var primaryColor = '01579B';
			var secondaryColor = '4B6C86';

			createMonoPalette('primaryMono', primaryColor);
			createMonoPalette('secondary', secondaryColor);

			var primaryPalette = $mdThemingProvider.extendPalette('primaryMono', { '100': '5d94bf' });
			$mdThemingProvider.definePalette('primary', primaryPalette);

			$mdThemingProvider.theme('default')
				.primaryPalette('primary')
				.accentPalette('secondary')
				.warnPalette('red')
				.backgroundPalette('grey');

			function createMonoPalette(name, color) {
				return $mdThemingProvider.definePalette(name, {
					'50': color,
					'100': color,
					'200': color,
					'300': color,
					'400': color,
					'500': color,
					'600': color,
					'700': color,
					'800': color,
					'900': color,
					'A100': color,
					'A200': color,
					'A400': color,
					'A700': color,
					'contrastDefaultColor': 'light',
					'contrastDarkColors': ['50', '100', '200', '300', '400', 'A100'],
					'contrastLightColors': undefined
				});
			}
		});
})(angular);
