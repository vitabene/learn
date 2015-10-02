var gulp = require('gulp'),
		concat = require('gulp-concat'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync').create();

gulp.task('build', function() {
	gulp.src('src/scripts/**/*.*')
		.pipe(plumber())
		.pipe(gulp.dest('build/scripts'));
	gulp.src('src/index.html')
	  .pipe(gulp.dest('build/'));
	gulp.src('src/views/*.html')
	  .pipe(gulp.dest('build/views'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
			server: "./src"
	});
});

gulp.task('sass', function () {
  gulp.src('src/styles/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest('build/styles'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('watch', function(){
	gulp.watch('src/**/*.*', ['build', 'sass']);
	gulp.watch('src/scripts/*.js').on('change', browserSync.reload);
});
