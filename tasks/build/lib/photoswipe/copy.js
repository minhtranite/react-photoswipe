import gulp from 'gulp';

export default () => {
  return gulp
    .src([
      'node_modules/photoswipe/dist/default-skin/**/*',
      '!node_modules/photoswipe/dist/**/*.{scss,css,js}'
    ])
    .pipe(gulp.dest('lib'))
    .pipe(gulp.dest('dist'));
};
