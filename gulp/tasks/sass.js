var gulp        = require('gulp');
var gutil       = require('gulp-util');

var browserSync = require('browser-sync');
var inject      = require('gulp-inject');
var naturalSort = require('gulp-natural-sort');
var sass        = require('gulp-sass');

var path        = require('../paths.js');


gulp.task('inject-sass', function() {
	var target = gulp.src(path.to.sass.main.source);
	var sources = gulp.src(path.to.sass.components, { read: false }).pipe(naturalSort());

	return target
		.pipe(inject(sources, { relative: true }))
		.pipe(gulp.dest(path.to.sass.main.destination));
});

gulp.task('compile-sass', ['inject-sass'], function() {
	return gulp.src(path.to.sass.main.source)
		.pipe(sass())
		.on('error', handleError)
		.pipe(gulp.dest(path.to.sass.destination))
		.pipe(browserSync.stream()); // Inject styles into the browser when serving files though `browserSync`
});

function handleError(error) {
	gutil.beep();
	console.log('\n', error.formatted, '\n');
	this.emit('end');
}
