var gulp             = require('gulp'),
	babel            = require('gulp-babel'),
	concat           = require('gulp-concat'),
	copy             = require('gulp-copy'),
	del              = require('del'),
	file             = require('gulp-file'),
	inject           = require('gulp-inject'),
	naturalSort      = require('gulp-natural-sort'),
	runSequence      = require('run-sequence'),
	sass             = require('gulp-sass'),
	streamSeries     = require('stream-series');

var buildPath = 'build/';

gulp.task('clean', removeBuildFiles);
gulp.task('dev', buildDevFiles);
gulp.task('dev:assets', copyAssets);
gulp.task('dev:styles', compileStyles);
gulp.task('dev:scripts', compileScripts);

function removeBuildFiles() {
	return del(buildPath);
}

function buildDevFiles(doneCallback) {
	runSequence('clean', ['dev:assets', 'dev:styles', 'dev:scripts'], doneCallback);
}

function copyAssets() {
	var assets = [
		'src/index.html',
		'src/assets/**/*',
		'!src/assets/styles/*'
	];

	return gulp.src(assets)
		.pipe(copy(buildPath, { prefix: 1 }));
}

function compileStyles() {

	// Create a stream of SCSS files that preserves ITCSS ordering
	var sources = [
		['src/assets/styles/*.settings.scss'],
		['src/assets/styles/*.tools.scss'],
		['src/assets/styles/*.generic.scss'],
		['src/assets/styles/*.base.scss'],
		['src/assets/styles/*.object.scss'],
		[ // Catch any SCSS files that do not follow the ITCSS naming convention
			'src/assets/styles/*.scss',
			'!src/assets/styles/*.settings.scss',
			'!src/assets/styles/*.tools.scss',
			'!src/assets/styles/*.generic.scss',
			'!src/assets/styles/*.base.scss',
			'!src/assets/styles/*.object.scss'
		],
		['src/views/**/*.scss'],
		['src/assets/styles/*.trump.scss']
	];

	return file('montage.scss', '/* inject:scss */\n/* endinject */', { src: true })
		.pipe(inject(createOrderedStream(sources, { read: false }), { relative: true }))
		.pipe(sass())
		.pipe(gulp.dest(buildPath));
}

function compileScripts() {
	var sources = [
		['src/**/*.module.js'],
		['src/**/*.service.js'],
		['src/**/*.filter.js'],
		['src/**/*.component.js']
	];

	return createOrderedStream(sources)
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(buildPath));
}

/**
 * Combine an array of sources into a single source stream, while preserving the original order.
 *
 * @param {string[]|string[][]} globGroups - An array of source globs to concatenate
 * @param {Object} [options] - Options to pass to `gulp.src`
 * @returns {Stream}
 */
function createOrderedStream(globGroups, options) {
	var streams = globGroups.map(function(globs) {
		return gulp.src(globs, options).pipe(naturalSort());
	});

	return streamSeries.apply(null, streams);
}
