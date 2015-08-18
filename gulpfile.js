'use strict';

var gulp = require('gulp');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

var autoprefixerBrowsers = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('clean', function () {
  del.sync(['lib']);
});

gulp.task('sass', function () {
  gulp.src('src/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerBrowsers))
    .pipe(gulp.dest('lib'));
});

gulp.task('babel', function () {
  return gulp.src('src/*.{js,jsx}')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('copy', function () {
  return gulp.src(['src/**/*', '!src/*.{scss,js}'], {dot: true})
    .pipe(gulp.dest('lib'));
});

gulp.task('lib', function (callback) {
  runSequence('clean', 'babel', 'sass', 'copy', callback);
});

gulp.task('default', function () {
  gulp.start('lib');
});
