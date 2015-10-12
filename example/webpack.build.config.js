var WebpackConfig = require('./helper/webpack-config');

module.exports = WebpackConfig({
  hot: false,
  hash: true,
  debug: false,
  optimize: true,
  progress: true,
  profile: true,
  bail: true,
  saveStats: true,
  failOnError: true,
  banner: true
});
