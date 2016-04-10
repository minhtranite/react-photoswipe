import gulp from 'gulp';

export default () => {
  return gulp
    .src(['example/app/*', '!example/app/*.{html,js}'], {nodir: true})
    .pipe(gulp.dest('example/dist'));
};
