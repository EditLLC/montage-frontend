// File globs

var destination = 'build/';

module.exports = {
	to: {
		destination: destination,

		assets: {
			source: ['src/assets/**/*', '!src/assets/styles{,/**}'],
			destination: destination
		},

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
				source: 'src/assets/styles/app.scss',
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
