(function(angular) {
	'use strict';

	angular
		.module('montage')
		.config(stateConfig);

	function stateConfig($stateProvider, $locationProvider, $urlRouterProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/login');

		$stateProvider

			/************
			 * Misc
			 ************/

			.state('login', {
				url: '/login',
				template: '<login />'
			})
			.state('layout', {
				abstract: true,
				template: '<layout />'
			})
			.state('dashboard', {
				url: '/',
				parent: 'layout',
				template: '<dashboard />'
			})


			/************
			 * Account
			 ************/

			.state('account', {
				parent: 'layout',
				template: '<account />'
			})
			.state('account.profile', {
				url: '/account',
				template: '<account-profile />'
			})
			.state('account.password', {
				url: '/account/password',
				template: '<account-password />'
			})


			/************
			 * Browsers
			 ************/

			.state('recordBrowser', {
				url: '/data',
				parent: 'layout',
				template: '<record-browser />'
			})
			.state('fileBrowser', {
				url: '/files',
				parent: 'layout',
				template: '<file-browser />'
			})


			/************
			 * Roles
			 ************/

			.state('roleCreate', {
				url: '/roles/create',
				parent: 'layout',
				template: '<role-create />'
			})
			.state('roleDetail', {
				url: '/roles/:role_id',
				parent: 'layout',
				template: '<role-detail />'
			})
			.state('roleList', {
				url: '/roles',
				parent: 'layout',
				template: '<role-list />'
			})


			/************
			 * Schemas
			 ************/

			.state('schemaCreate', {
				url: '/schemas/create',
				parent: 'layout',
				template: '<schema-create />'
			})
			.state('schemaDetail', {
				url: '/schemas/:schema_id',
				parent: 'layout',
				template: '<schema-detail />'
			})
			.state('schemaList', {
				url: '/schemas',
				parent: 'layout',
				template: '<schema-list />'
			})


			/************
			 * Users
			 ************/

			.state('userCreate', {
				url: '/users/create',
				parent: 'layout',
				template: '<user-create />'
			})
			.state('userDetail', {
				url: '/users/:user_id',
				parent: 'layout',
				template: '<user-detail />'
			})
			.state('userList', {
				url: '/users',
				parent: 'layout',
				template: '<user-list />'
			})
	}
})(angular);
