var gulp               = require('gulp'),
	babel              = require('gulp-babel'),
	browserSync        = require('browser-sync'),
	concat             = require('gulp-concat'),
	copy               = require('gulp-copy'),
	del                = require('del'),
	historyApiFallback = require('connect-history-api-fallback'),
	file               = require('gulp-file'),
	inject             = require('gulp-inject'),
	naturalSort        = require('gulp-natural-sort'),
	runSequence        = require('run-sequence'),
	sass               = require('gulp-sass'),
	streamSeries       = require('stream-series');

var buildPath = 'build/';

gulp.task('default', ['dev:serve']);
gulp.task('clean', removeBuildFiles);
gulp.task('dev', buildDevFiles);
gulp.task('dev:assets', copyAssets);
gulp.task('dev:styles', compileStyles);
gulp.task('dev:scripts', compileScripts);
gulp.task('dev:serve', ['dev'], serveDevFiles);

function removeBuildFiles() {
	return del(buildPath);
}

function buildDevFiles(doneCallback) {
	runSequence('clean', ['dev:assets', 'dev:styles', 'dev:scripts'], doneCallback);
}

function copyAssets() {
	var assets = [
		'src/**/*.html',
		'src/assets/**/*',
		'!src/assets/styles/**/*'
	];

	return gulp.src(assets)
		.pipe(copy(buildPath, { prefix: 1 }));
}

function compileStyles() {
	var target = gulp.src('src/assets/styles/main.scss');
	var sources = gulp.src(['src/views/**/*.scss', 'src/components/**/*.scss'], { read: false });

	return target
		.pipe(inject(sources, { relative: true }))
		.pipe(sass())
		.on('error', function(error) {
			console.log('\n', error.formatted, '\n');
			this.emit('end'); // Allow watches to continue by swallowing errors
		})
		.pipe(gulp.dest(buildPath))
		.pipe(browserSync.stream()); // Inject styles into the browser when serving files though `browserSync`
}

function compileScripts() {
	var sources = [
		[
			'src/**/*.module.js',
			'!src/assets/lib/**/*'
		],[
			'src/**/*.config.js',
			'src/**/*.service.js',
			'src/**/*.filter.js',
			'src/**/*.component.js',
			'!src/assets/lib/**/*'
		]
	];

	return createOrderedStream(sources)
		.pipe(babel({ presets: ['es2015'] })
		.on('error', function(error) {

			console.log('\n');
			console.log(error.name);
			console.log('------------');
			console.log(error.message);
			console.log(error.codeFrame);
			console.log('\n');

			this.emit('end'); // Allow watches to continue by swallowing errors
		}))
		.pipe(concat('app.js'))
		.pipe(gulp.dest(buildPath));
}

/**
 * Continuously build and serve the development version of the app.
 */
function serveDevFiles() {
	browserSync.init({
		open: false,
		server: {
			baseDir: buildPath,
			middleware: [historyApiFallback()],
			ghostMode: {
				clicks: true,
				forms: true,
				scroll: true
			}
		}
	});

	gulp.watch('src/**/*.scss', ['dev:styles']);
	gulp.watch('src/**/*.js', ['dev:scripts']);
	gulp.watch([
		'src/**/*.html',
		'src/assets/**/*',
		'!src/assets/styles/**/*'
	], function(event) {
		if(event.type === 'added' || event.type === 'changed') {
			return gulp.src(event.path)
				.pipe(copy(buildPath, { prefix: 1 }));
		}
	});
	gulp.watch(['build/**/*', '!build/main.css']).on('change', browserSync.reload);
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
