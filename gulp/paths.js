// File globs

var destination = 'build/';

module.exports = {
	to: {
		destination: destination,

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
	}
};
