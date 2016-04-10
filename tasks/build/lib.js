import gulp from 'gulp';
import taskDir from 'task-dir';
import runSequence from 'run-sequence';
import path from 'path';

taskDir(gulp, path.join(__dirname, 'lib'));

export default (callback) => {
  runSequence('build:lib:clean', 'build:lib:lint', 'build:lib:babel', 'build:lib:umd', 'build:lib:sass', 'build:lib:photoswipe', 'build:lib:copy', callback);
};
