var gulp = require('gulp');

var path = require('../paths.js');

gulp.task('copy-index', function() {
	return gulp.src(path.to.index.source)
		.pipe(gulp.dest(path.to.destination));
});

gulp.task('copy-templates', function() {
	return gulp.src(path.to.templates.source)
		.pipe(gulp.dest(path.to.templates.destination));
});

gulp.task('copy-assets', function() {
	return gulp.src(path.to.assets.source)
		.pipe(gulp.dest(path.to.assets.destination));
});
