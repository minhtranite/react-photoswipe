import gulp from 'gulp';

export default () => {
  return gulp
    .src(['src/**/*', '!src/**/*.{scss,js}'])
    .pipe(gulp.dest('lib'))
    .pipe(gulp.dest('dist'));
};
