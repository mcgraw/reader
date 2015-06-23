'use strict';

var gulp 		= require('gulp');				// Workhorse
var gutil 		= require('gulp-util');			// Log colors (gutils.log)
var jshint  	= require('gulp-jshint');		// Javascript code review
var browserify	= require('gulp-browserify');	// Allows us to utilize the require() syntax in the front-end
var concat		= require('gulp-concat');		// Concat files
var cache		= require('gulp-cache');
var livereload  = require('gulp-livereload');
var del			= require('del');

// JS hint task
gulp.task('jshint', function() {
	
	gulp.src('*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default')); // other 'pretty' reporters available
		
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
