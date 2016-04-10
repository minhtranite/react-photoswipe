import gulp from 'gulp';
import taskDir from 'task-dir';
import path from 'path';


taskDir(gulp, path.join(__dirname, 'tasks'));

gulp.task('default', ['build']);
