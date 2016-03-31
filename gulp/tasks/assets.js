var gulp = require('gulp');

var path = require('../paths.js');

gulp.task('copy-index', function() {
	return gulp.src(path.to.index.source)
		.pipe(gulp.dest(path.to.destination));
});
