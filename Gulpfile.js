'use strict';

var gulp 		= require('gulp');				// Workhorse
var gutil 		= require('gulp-util');			// Log colors (gutils.log)
var jshint  	= require('gulp-jshint');		// Javascript code review
var browserify	= require('gulp-browserify');	// Allows us to utilize the require() syntax in the front-end
var concat		= require('gulp-concat');		// Concat files
var stripDebug  = require('gulp-strip-debug');  //
var uglify	    = require('gulp-uglify');		//
var cache		= require('gulp-cache');		// 
var livereload  = require('gulp-livereload');	// 
var changed		= require('gulp-changed');		//
var imagemin	= require('gulp-imagemin');		// 
var minifyHTML  = require('gulp-minify-html');	//
var autoprefix  = require('gulp-autoprefixer'); //
var minifyCSS   = require('gulp-minify-css');   //
var del			= require('del');

// JS hint task
gulp.task('jshint', function() {
	gulp.src('*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default')); // other 'pretty' reporters available
});

// Minify new images
gulp.task('imagemin', function() {
	var imgSrc = './public/img/*',
	    imgDst = './build/images';
		
	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));	
});

// Minify new or changed HTML pages
gulp.task('htmlpage', function() {
	var htmlSrc = './public/*.html',
	    htmlDst = './build';
		
	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));	
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['./public/js/*.js'])
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['./public/css/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./build/styles/'));
});

// Default gulp task
// gulp.task('default', ["imagemin", "htmlpage", "scripts", "styles"], function() {
gulp.task('default', ['scripts'], function() {
	
	// watch for HTML changes
	// gulp.watch('./src/*.html', ["htmlpage"]);
	
	// watch for JS changes
	gulp.watch('*.js', ['jshint', 'scripts']);
	
	// watch for CSS changes
	// gulp.watch('./src/styles/*.css', ["styles"]);
	
});

// // Watch
// gulp.task('watch', function() {
	
// 	// Watch .js files
// 	gulp.watch('public/js/*.js', ['scripts']);
	
// 	// Create LiveReload server
// 	livereload.listen();
	
// });

// // JSHint Task
// gulp.task('lint', function() {
// 	gulp.src('./*.js')
// 		.pipe(jshint())
// 		.pipe(jshint.reporter('default')); // other 'pretty' reporters available
// });

// // Browserify Task
// gulp.task('browserify', function() {
// 	// Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
// 	gulp.src(['app.js'])
// 	.pipe(browserify({
// 		insertGlobals: true,
// 		debug: true
// 	}))
// 	// Bundle to a single file
// 	.pipe(concat('bundle.js'))
// 	// Output it to our dist folder
// 	.pipe(gulp.dest('public/js'));
// });

// gulp.task('watch', ['lint'], function() {
// 	// Watch our scripts
// 	gulp.watch(['*.js'],
// 			   ['lint', 'browserify']);
			   
// 	gulp.watch(['*.html']);
// });
