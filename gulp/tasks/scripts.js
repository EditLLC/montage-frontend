var gulp = require('gulp');

var inject = require('gulp-inject');
var naturalSort = require('gulp-natural-sort');
var streamSeries = require('stream-series');

var path = require('../paths.js');


gulp.task('inject-scripts', function() {
	var target = gulp.src(path.to.index.source);
	var sources = getScriptSources();

	var options = {
		relative: true,
		starttag: '<!-- build:js app.js -->',
		endtag: '<!-- endbuild -->'
	}

	return target
		.pipe(inject(sources, options))
		.pipe(gulp.dest(path.to.index.destination));
});

function getScriptSources(read) {
	var moduleStream = gulp.src(path.to.scripts.modules, { read: read })
		.pipe(naturalSort());

	var otherPath = [path.to.scripts.source, '!' + path.to.scripts.modules];
	var otherStream = gulp.src(otherPath, { read: read }).pipe(naturalSort())

	return streamSeries(moduleStream, otherStream);
}
