var gulp = require('gulp');
var gutil = require('gulp-util');

var babel = require('gulp-babel');
var inject = require('gulp-inject');
var naturalSort = require('gulp-natural-sort');
var streamSeries = require('stream-series');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var path = require('../paths.js');


gulp.task('inject-scripts', function() {
	var target = gulp.src(path.to.index.source);
	var sources = getSortedSources()
		.pipe(rename(path => path.dirname = 'scripts/' + path.dirname));

	var options = {
		relative: true,
		starttag: '<!-- build:js app.js -->',
		endtag: '<!-- endbuild -->'
	}

	return target
		.pipe(inject(sources, options))
		.pipe(gulp.dest(path.to.index.destination));
});

gulp.task('compile-scripts', ['inject-scripts'], function() {
	return gulp.src(path.to.scripts.source)
		.pipe(babel({ presets: ['es2015'] }))
		.on('error', handleError)
		.pipe(replace(/templateUrl:\s*(?:'|")(.*?)(?:'|"),?/, "templateUrl: 'templates/$1',"))
		.pipe(gulp.dest(path.to.scripts.destination));
});

function handleError(error) {
	gutil.beep();

	console.log('\n');
	console.log(error.name);
	console.log('------------');
	console.log(error.message);
	console.log(error.codeFrame);
	console.log('\n');

	this.emit('end');
}

function getSortedSources(read) {
	var moduleStream = gulp.src(path.to.scripts.modules, { read: read })
		.pipe(naturalSort());

	var otherPath = [path.to.scripts.source, '!' + path.to.scripts.modules];
	var otherStream = gulp.src(otherPath, { read: read }).pipe(naturalSort())

	return streamSeries(moduleStream, otherStream);
}
