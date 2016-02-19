var gulp             = require('gulp'),
	file             = require('gulp-file'),
	inject           = require('gulp-inject'),
	naturalSort      = require('gulp-natural-sort'),
	sass             = require('gulp-sass'),
	streamSeries     = require('stream-series');

var buildPath = 'build/';

gulp.task('dev:styles', compileStyles);

function compileStyles() {
	return file('montage.scss', '/* inject:scss */\n/* endinject */', { src: true })
		.pipe(inject(getStyleStream(), { relative: true }))
		.pipe(sass())
		.pipe(gulp.dest(buildPath));
}

/**
 * Create a stream of SCSS files that preserves ITCSS ordering.
 */
function getStyleStream() {
	var sources = [
		'src/assets/styles/*.settings.scss',
		'src/assets/styles/*.tools.scss',
		'src/assets/styles/*.generic.scss',
		'src/assets/styles/*.base.scss',
		'src/assets/styles/*.object.scss',

		// Catch any SCSS files that do not follow the ITCSS naming convention.
		[
			'src/assets/styles/*.scss',
			'!src/assets/styles/*.settings.scss',
			'!src/assets/styles/*.tools.scss',
			'!src/assets/styles/*.generic.scss',
			'!src/assets/styles/*.base.scss',
			'!src/assets/styles/*.object.scss'
		],
		'src/views/**/*.scss',
		'src/assets/styles/*.trump.scss'
	];

	var streams = sources.map(function(source) {
		return gulp.src(source, { read: false }).pipe(naturalSort());
	});

	return streamSeries.apply(null, streams);
}
