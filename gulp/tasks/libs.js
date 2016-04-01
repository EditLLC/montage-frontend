var gulp = require('gulp');

var copy = require('gulp-copy');
var wiredep = require('wiredep');

var path = require('../paths.js');

gulp.task('inject-libs', function() {
	var wiredepOptions = {
		ignorePath: '../bower_components/',
		fileTypes: {
			html: {
				block: /(([ \t]*)<!--\s*build:*(\S*)\slib\.(?:css|js)\s*-->)(\n|\r|.)*?(<!--\s*endbuild\s*-->)/gi,
				replace: {
					js: '<script src="libs/{{filePath}}"></script>',
					css: '<link rel="stylesheet" href="libs/{{filePath}}" />'
				}
			}
		}
	};

	return gulp.src(path.to.index.source)
		.pipe(wiredep.stream(wiredepOptions))
		.pipe(gulp.dest(path.to.index.destination));
});

gulp.task('copy-libs', function() {
	var sourceFiles = wiredep();
	sourceFiles = [].concat(sourceFiles.js, sourceFiles.css);

	return gulp.src(sourceFiles)
		.pipe(copy(path.to.libs.destination, { prefix: 1 }));
});
