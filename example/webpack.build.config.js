var WebpackConfig = require('./helper/webpack-config');

module.exports = WebpackConfig({
  hot: false,
  hash: true,
  debug: false,
  optimize: true,
  saveStats: true,
  failOnError: true,
  banner: true
});
