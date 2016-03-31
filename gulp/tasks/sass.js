var gulp        = require('gulp');

var inject      = require('gulp-inject');
var naturalSort = require('gulp-natural-sort');

var path        = require('../paths.js');


gulp.task('inject-sass', function() {
	var target = gulp.src(path.to.sass.main.source);
	var sources = gulp.src(path.to.sass.sources, { read: false }).pipe(naturalSort());

	return target
		.pipe(inject(sources, { relative: true }))
		.pipe(gulp.dest(path.to.sass.main.destination));
});
