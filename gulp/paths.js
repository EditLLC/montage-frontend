// File globs

var destination = 'build/';

module.exports = {
	to: {
		destination: destination,

		templates: {
			source: ['src/**/*.html', '!src/index.html'],
			destination: destination
		},

		index: {
			source: 'src/index.html',
			destination: 'src/'
		},

		sass: {
			main: {
				source: 'src/assets/styles/main.scss',
				destination: 'src/assets/styles/'
			},
			sources: [
				'src/views/**/*.scss',
				'src/components/**/*.scss'
			],
			destination: destination
		},

		scripts: {
			source: 'src/**/*.js',
			modules: 'src/**/*.module.js',
			destination: destination
		}
	}
};
