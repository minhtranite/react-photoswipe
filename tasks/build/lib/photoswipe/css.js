import gulp from 'gulp';
import replace from 'gulp-replace';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';

export default () => {
  return gulp
    .src([
      'node_modules/photoswipe/dist/photoswipe.css',
      'node_modules/photoswipe/dist/default-skin/default-skin.css'
    ])
    .pipe(replace(/url\s*\((\S+)\)/gi, 'url("./$1")'))
    .pipe(concat('photoswipe.css'))
    .pipe(autoprefixer({
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
    }))
    .pipe(gulp.dest('lib'))
    .pipe(minifyCss({
      rebase: false,
      compatibility: '+properties.urlQuotes'
    }))
    .pipe(gulp.dest('dist'));
};
