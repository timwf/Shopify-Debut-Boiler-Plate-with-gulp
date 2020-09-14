const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rename = require('gulp-rename');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const sourcemaps = require('gulp-sourcemaps');


// Development Tasks
// -----------------

// Start reload
gulp.task('reload', () => {
  gulp.watch('./scss/**/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./*.*').on('change', browserSync.reload);
  gulp.watch('./js/**/main.js', gulp.parallel('scripts'));
});

gulp.task('sass', () => {
  return gulp
    .src('./scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(rename('lm-theme.min.css.liquid'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./assets'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp
    .src('./js/main.js')
    .pipe(rename('lm-main.min.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/'))
    .pipe(browserSync.stream());
});


// Watchers
gulp.task(
  'watch',
  gulp.series('sass','scripts', 'reload')
);

// gulp.series('sass', 'libs', 'scripts', 'browserSync')
