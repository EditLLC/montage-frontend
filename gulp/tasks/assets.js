var gulp = require('gulp');

var htmlmin = require('gulp-htmlmin');
var inject = require('gulp-inject');
var templateCache = require('gulp-angular-templatecache');

var path = require('../paths.js');

gulp.task('copy-index', function() {
	return gulp.src(path.to.index.source)
		.pipe(gulp.dest(path.to.destination));
});

gulp.task('copy-templates', function() {
	return gulp.src(path.to.templates.source)
		.pipe(gulp.dest(path.to.templates.destination));
});

gulp.task('inject-templates', ['compile-templates'], function() {
	var source = gulp.src(path.to.destination + 'templates.js', { read: false });

	return gulp.src(path.to.destination + 'index.html')
		.pipe(inject(source, { name: 'templates', relative: true }))
		.pipe(gulp.dest(path.to.destination));
});

gulp.task('compile-templates', ['copy-templates'], function() {
	var htmlminOptions = {
		removeComments: true,
		collapseWhitespace: true,
		conservativeCollapse: true,
		collapseBooleanAttributes: true,
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		minifyJS: true,
		minifyCSS: true
	};

	return gulp.src(path.to.template.destination + '**/*.html')
		.pipe(htmlmin(htmlminOptions))
		.pipe(templateCache({ module: 'montage', root: 'templates/' }))
		.pipe(gulp.dest(path.to.destination));
});

gulp.task('copy-assets', function() {
	return gulp.src(path.to.assets.source)
		.pipe(gulp.dest(path.to.assets.destination));
});

gulp.task('copy-all', ['copy-index', 'copy-templates', 'copy-assets']);
