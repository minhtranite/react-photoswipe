import gulp from 'gulp';
import sass from 'gulp-sass';
import filter from 'gulp-filter';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default () => {
  let cssFilter = filter('**/*.css');
  return gulp
    .src(['src/*.scss', '!src/_*.scss'])
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(cssFilter)
    .pipe(gulp.dest('lib'))
    .pipe(postcss([
      autoprefixer({
        browsers: [
          'ie >= 10',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 7',
          'android >= 4.4',
          'bb >= 10'
        ]
      }),
      cssnano({
        safe: true,
        discardComments: {removeAll: true}
      })
    ]))
    .pipe(gulp.dest('dist'));
};
