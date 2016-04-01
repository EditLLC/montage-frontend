var gulp = require('gulp');


gulp.task('pre-build', ['compile-scripts', 'copy-libs', 'compile-sass', 'copy-all', 'inject-templates']);
