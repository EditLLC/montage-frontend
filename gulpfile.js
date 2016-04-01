var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');

// Require all tasks
requireDir('./gulp/tasks', { recurse: true });


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
