'use strict';

var gulp 		= require('gulp');				// Workhorse
// var gutil 		= require('gulp-util');			// Log colors (gutils.log)
var jshint  	= require('gulp-jshint');		// Javascript code review
// var browserify	= require('gulp-browserify');	// Allows us to utilize the require() syntax in the front-end
var concat		= require('gulp-concat');		// Concat files
var stripDebug  = require('gulp-strip-debug');  //
var uglify	    = require('gulp-uglify');		//
// var cache		= require('gulp-cache');		// 
var changed		= require('gulp-changed');		//
var imagemin	= require('gulp-imagemin');		// 
var minifyHTML  = require('gulp-minify-html');	//
var autoprefix  = require('gulp-autoprefixer'); //
var minifyCSS   = require('gulp-minify-css');   //
var nodemon		= require('gulp-nodemon');		//
var browserSync = require('browser-sync')		//
// var del			= require('del');				//

// JS hint task
gulp.task('lint', function() {
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

// Application state monitoring
gulp.task('js-watch', ['lint'], browserSync.reload);
gulp.task('serve', ['nodemon'], function() {	
	
	// Find more configuration options at http://www.browsersync.io/docs/options/
	browserSync.init({
		
		// watch the following files
		files: ['public/**/*.*'],
		
		// proxy our expressjs app running at this location
		proxy: 'http://localhost:8080',
		
		// inform browser-sync to use the following port to avoid clashing
		port: 4000,
		
		// open the proxied app in chrome
		browser: ['google-chrome']
		
	});
	
	gulp.watch('*.js', ['js-watch']);
});

gulp.task('nodemon', function(cb) {
	var called = false;
	
	nodemon({
		script: 'app.js',
		watch: ['app.js']
	})
	.on('start', function onStart() {
		if (!called) { cb(); }
		called = true;
	});
});

// ["imagemin", "htmlpage", "scripts", "styles"]
gulp.task('default', ['serve']);