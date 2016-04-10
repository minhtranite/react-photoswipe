import gulp from 'gulp';
import taskDir from 'task-dir';
import runSequence from 'run-sequence';
import path from 'path';

taskDir(gulp, path.join(__dirname, 'example'));

export default (callback) => {
  runSequence('build:example:clean', 'build:example:webpack', 'build:example:copy', callback);
};
