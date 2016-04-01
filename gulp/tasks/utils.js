var gulp = require('gulp');
var del  = require('del');

var path = require('../paths.js');


gulp.task('clean', function() {
	return del(path.to.destination);
});
