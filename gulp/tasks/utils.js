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

gulp.task('watch', function() {
	gulp.watch('src/**/*.scss', ['compile-sass']);
	gulp.watch('src/**/*.js', ['compile-scripts']);
	gulp.watch('../../bower_components/**/*', ['copy-libs']);
	gulp.watch('src/index.html', ['copy-index']);
	gulp.watch('src/**/*.html', ['copy-templates']);
	gulp.watch(['src/assets/**/*', '!src/assets/styles/**'], ['copy-assets']);
	gulp.watch(['build/**/*', '!build/app.css']).on('change', browserSync.reload);
});