var gulp = require('gulp')
var browserSync = require('browser-sync')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var reload = browserSync.reload
var server = browserSync.create()
var src = {
      scss: 'scss/{,*/}*.{scss,sass}',
      css: 'css/{,*/}*.css',
      css_dest: 'css/',
      javascript: 'js/{,*/}*.js',
      html: 'index.html'
  };

gulp.task('reload', function(done) {
  server.reload();
  done();
});

gulp.task('serve', function(done) {
  server.init({
    server: {
      baseDir: './'
    }
  });
  done();
});

// Compile SASS in dev mode.
gulp.task('sass-dev', function () {
  return gulp.src(src.scss, { follow: true })
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(src.css_dest))
    .pipe(reload({
      stream: true
    }));
});



// Task for local, static development.
gulp.task('dev', gulp.series(function () {
  // Watch for changes, re-apply tasks, reload browsers.
  gulp.watch(src.scss).on('change', gulp.series('sass-dev', 'reload'));
  gulp.watch(src.html).on('change', gulp.series('reload'));
}));

// Main tasks.
gulp.task('default', gulp.series('serve', 'dev'));
