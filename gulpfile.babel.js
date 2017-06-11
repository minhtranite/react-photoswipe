import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import concat from 'gulp-concat';
import replace from 'gulp-replace';
import runSequence from 'run-sequence';
import pkg from './package.json';
import webpackConfig from './webpack.config';
import exampleWebpackConfig from './example/webpack.config.babel';

gulp.task('build:lib:clean', () => {
  del.sync(['lib', 'dist']);
});

gulp.task('build:lib:babel', () => gulp
  .src(['src/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('lib')));

gulp.task('build:lib:umd', () => gulp
  .src(['src/index.js'])
  .pipe(webpackStream(webpackConfig, webpack))
  .pipe(gulp.dest('dist')));

gulp.task('build:lib:style', () => gulp
  .src(['src/**/*.scss', '!src/**/_*.scss'])
  .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(gulp.dest('lib'))
  .pipe(concat(`${pkg.name}.css`))
  .pipe(postcss())
  .pipe(gulp.dest('dist')));

gulp.task('build:lib:photoswipe:css', () => gulp
  .src([
    'node_modules/photoswipe/dist/photoswipe.css',
    'node_modules/photoswipe/dist/default-skin/default-skin.css'
  ])
  .pipe(replace(/url\s*\((\S+)\)/gi, 'url("./$1")'))
  .pipe(concat('photoswipe.css'))
  .pipe(gulp.dest('lib'))
  .pipe(postcss())
  .pipe(gulp.dest('dist')));

gulp.task('build:lib:photoswipe:copy', () => gulp
  .src([
    'node_modules/photoswipe/dist/default-skin/**/*',
    '!node_modules/photoswipe/dist/**/*.{scss,css,js}'
  ])
  .pipe(gulp.dest('lib'))
  .pipe(gulp.dest('dist')));

gulp.task('build:lib:copy', () => gulp
  .src(['src/**/*', '!src/**/*.{scss,js}'])
  .pipe(gulp.dest('lib'))
  .pipe(gulp.dest('dist')));

gulp.task('build:lib', (callback) => {
  runSequence(
    'build:lib:clean',
    'build:lib:babel',
    'build:lib:umd',
    'build:lib:style',
    'build:lib:photoswipe:css',
    'build:lib:photoswipe:copy',
    'build:lib:copy',
    callback
  );
});

gulp.task('build:example:clean', () => {
  del.sync(['example/dist']);
});

gulp.task('build:example:webpack', () => gulp
  .src(['example/app/app.js'])
  .pipe(webpackStream(exampleWebpackConfig, webpack))
  .pipe(gulp.dest('example/dist')));

gulp.task('build:example:copy', () => gulp
  .src(['example/app/*', '!example/app/*.{html,js}'], { nodir: true })
  .pipe(gulp.dest('example/dist')));

gulp.task('build:example', (callback) => {
  runSequence(
    'build:example:clean',
    'build:example:webpack',
    'build:example:copy',
    callback
  );
});

gulp.task('build', (callback) => {
  runSequence('build:lib', 'build:example', callback);
});

gulp.task('default', ['build']);
