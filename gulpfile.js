var gulp = require('gulp'),
		concat = require('gulp-concat'),
		plumber = require('gulp-plumber'),
		sourcemaps = require('gulp-sourcemaps'),
		sass = require('gulp-sass'),
		browserSync = require('browser-sync').create();

gulp.task('build', function() {
	gulp.src('src/js/*.js')
		.pipe(plumber())
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build'));
	gulp.src('src/index.html')
	  .pipe(gulp.dest('build/'));
});

gulp.task('browser-sync', function() {
	browserSync.init({
			server: "./src"
	});
});

gulp.task('sass', function () {
  gulp.src('src/scss/*.scss')
		.pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sourcemaps.write())
    .pipe(gulp.dest('build/css'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['browser-sync', 'watch']);
gulp.task('watch', function(){
	gulp.watch('src/**/*.*', ['build', 'sass']);
	gulp.watch('src/js/*.js').on('change', browserSync.reload);
});
