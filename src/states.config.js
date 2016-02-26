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

			.state('role', {
				abstract: true,
				parent: 'layout',
				template: '<empty-parent />'
			})
			.state('role.create', {
				url: '/roles/create',
				template: '<role-create />'
			})
			.state('role.detail', {
				url: '/roles/:role_id',
				template: '<role-detail />'
			})
			.state('role.list', {
				url: '/roles',
				template: '<role-list />'
			})


			/************
			 * Schemas
			 ************/

			.state('schema', {
				abstract: true,
				parent: 'layout',
				template: '<empty-parent />'
			})
			.state('schema.create', {
				url: '/schemas/create',
				template: '<schema-create />'
			})
			.state('schema.detail', {
				url: '/schemas/:schema_id',
				template: '<schema-detail />'
			})
			.state('schema.list', {
				url: '/schemas',
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
