import gulp from 'gulp';
import babel from 'gulp-babel';

export default () => {
  return gulp
    .src(['src/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('lib'));
};
