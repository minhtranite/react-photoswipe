import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import exampleWebpackConfig from '../../../example/webpack.config';
import webpack from 'webpack';

export default () => {
  return gulp
    .src(['example/app/app.js'])
    .pipe(webpackStream(exampleWebpackConfig, webpack))
    .pipe(gulp.dest('example/dist'));
};
