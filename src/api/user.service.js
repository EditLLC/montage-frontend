(function (angular) {
	'use strict';

	angular
		.module('montage')
		.factory('userService', userService);

	function userService($q) {
		return {
			get,
			list
		};

		////////////

		function get(id) {
			return $q.when({
				id: "7",
				image: 'https://secure.gravatar.com/avatar/872e2bd6b9820cb5bd5440b1892ee59e.jpg?d=retro&s=50&r=pg',
				token: '208419cdaf04381df4901f5cba8bf1179cfa54fb',
				name: 'Nick Herrera',
				email: 'nherrera@editllc.com',
				role: 'Admin',
				permissions: {
					members: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					roles: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					accessKeys: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					scheduler: {
						canView: true,
						canChange: true,
						canDelete: true
					},
					data: {
						canView: true,
						canChange: true,
						canDelete: true
					}
				}
			});
		}

		function list() {
			return $q.when([{
				id: 1,
				image: 'https://secure.gravatar.com/avatar/bcf2a18ae1c34a01da75af996f2315f0.jpg?d=retro&s=50&r=pg',
				name: 'Derek Payton',
				email: 'dpayton@editllc.com',
				role: 'Admin'
			}, {
				id: 2,
				image: 'https://secure.gravatar.com/avatar/174f6ed925772b5485fa046423e07403.jpg?d=retro&s=50&r=pg',
				name: 'Darin Haener',
				email: 'dphaener@gmail.com',
				role: 'Admin'
			}, {
				id: 3,
				image: 'https://secure.gravatar.com/avatar/b168be5ee776d6fa69c87607aaee0128.jpg?d=retro&s=50&r=pg',
				name: 'Irma L. Olguin Jr.',
				email: 'irma@buildicus.com',
				role: 'Admin'
			}, {
				id: 4,
				image: 'https://secure.gravatar.com/avatar/27c4a45de7df164961a6175b84423351.jpg?d=retro&s=50&r=pg',
				name: 'Jason Shoup',
				email: 'jshoup@editllc.com',
				role: 'Admin'
			}, {
				id: 5,
				image: 'https://secure.gravatar.com/avatar/033fbaf346ade1568b42328b10f0a230.jpg?d=retro&s=50&r=pg',
				name: 'Maria Mayes',
				email: 'mmayes@editllc.com',
				role: 'Admin'
			}, {
				id: 6,
				image: 'https://secure.gravatar.com/avatar/de1da949a8d7ca09e7c6f0b62015dd99.jpg?d=retro&s=50&r=pg',
				name: 'Matt Soghoian',
				email: 'msoghoian@editllc.com',
				role: 'Admin'
			}, {
				id: 7,
				image: 'https://secure.gravatar.com/avatar/872e2bd6b9820cb5bd5440b1892ee59e.jpg?d=retro&s=50&r=pg',
				name: 'Nick Herrera',
				email: 'nherrera@editllc.com',
				role: 'Admin'
			}, {
				id: 8,
				image: 'https://secure.gravatar.com/avatar/9bde5a8d4015ff4e59b60adfd3223280.jpg?d=retro&s=50&r=pg',
				name: 'Zach',
				email: 'zackify@gmail.com',
				role: 'Admin'
			}, {
				id: 9,
				image: 'https://secure.gravatar.com/avatar/61507437e4df7f989307a46cf5e558bb.jpg?d=retro&s=50&r=pg',
				name: 'Z',
				email: 'zackify+test@gmail.com'
			}]);
		}
	}
})(angular);
