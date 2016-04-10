import {spawnSync} from 'child_process';

export default (callback) => {
  let start = spawnSync('babel-node', ['example/webpack.server.js'], {stdio: 'inherit'});
  if (start.stderr) {
    callback(start.stderr);
  }
};
