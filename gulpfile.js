var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');

// Require all tasks
requireDir('./gulp/tasks', { recurse: true });


gulp.task('default', ['develop:serve']);

gulp.task('develop', function() {
	runSequence(
		'clean',
		'compile-sass',
		'compile-scripts',
		'inject-libs',
		'copy-libs',
		'copy-all'
	);
});

gulp.task('develop:serve', function() {
	runSequence('develop', 'serve');
});

gulp.task('build', function() {
	runSequence(
		'clean',
		'pre-build',
		'make-build',
		'post-build'
	);
});

gulp.task('build:serve', function() {
	runSequence('build', 'serve');
});
