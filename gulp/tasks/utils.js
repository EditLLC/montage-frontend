var gulp = require('gulp');

var del = require('del');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

var path = require('../paths.js');


gulp.task('clean', function() {
	return del(path.to.destination);
});

gulp.task('serve', function() {
	browserSync.init({
		open: false,
		server: {
			baseDir: path.to.destination,
			middleware: [historyApiFallback()],
			ghostMode: {
				clicks: true,
				forms: true,
				scroll: true
			}
		}
	});
});
