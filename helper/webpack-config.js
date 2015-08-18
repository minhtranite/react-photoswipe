var merge = require('lodash.merge');
var webpack = require('webpack');
var path = require('path');
var webpackStatsHelper = require('./webpack-stats-helper');
var url = require('url');

module.exports = function (options) {
  var defaultOptions = {
    hot: false,
    hash: false,
    debug: false,
    optimize: false,
    saveStats: false,
    failOnError: false,
    host: '0.0.0.0',
    port: 3000,
    https: false
  };

  options = merge(defaultOptions, options || {});

  var entry = {
    app: path.join(__dirname, '../example/app.js')
  };

  var scssIncludePaths = [
    path.join(__dirname, '../example/bower_components'),
    path.join(__dirname, '../node_modules')
  ];

  var autoprefixer = {
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
  };

  var loaders = [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'react-hot-loader!babel-loader'
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?' + JSON.stringify(autoprefixer) + '!sass-loader?outputStyle=expanded&' + scssIncludePaths.join('&includePaths[]=')
    },
    {
      test: /\.sass$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?' + JSON.stringify(autoprefixer) + '!sass-loader?indentedSyntax=sass'
    },
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!autoprefixer-loader?' + JSON.stringify(autoprefixer) + '!less-loader'
    }
  ];

  if (options.hash) {
    loaders.push({
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader?name=[hash].[ext]'
    });
    loaders.push({
      test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
      loader: 'file-loader?name=[hash].[ext]'
    });
  } else {
    loaders.push({
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader?name=[name].[ext]'
    });
    loaders.push({
      test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
      loader: 'file-loader?name=[name].[ext]'
    });
  }

  var plugins = [];

  if (options.hot) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (!options.optimize) {
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }));
  } else {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }));
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }));
    plugins.push(new webpack.NoErrorsPlugin());
  }

  if (options.saveStats) {
    plugins.push(new webpackStatsHelper.saveToFile(path.join(__dirname, '../dist/webpack.stats.json')));
  }

  var config = {
    entry: Object.keys(entry).reduce(function (result, key) {
      result[key] = options.hot ? [
        'webpack-dev-server/client?' + url.format({
          hostname: options.host,
          port: options.port,
          protocol: options.https ? 'https' : 'http'
        }),
        'webpack/hot/dev-server',
        entry[key]
      ] : entry[key];
      return result;
    }, {}),
    output: {
      path: path.join(__dirname, '../dist'),
      filename: options.hash ? '[hash].js' : '[name].js',
      chunkFilename: options.hash ? '[chunkhash].js' : '[name].chunk.js',
      publicPath: ''
    },
    resolve: {
      extensions: ['', '.jsx', '.js'],
      alias: {
        app: path.join(__dirname, '../example'),
        test: path.join(__dirname, '../test')
      }
    },
    module: {
      preLoaders: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'eslint-loader'
        }
      ],
      loaders: loaders
    },
    plugins: plugins,
    eslint: {
      configFile: path.join(__dirname, '../.eslintrc'),
      failOnError: options.failOnError,
      emitError: options.failOnError
    },
    debug: options.debug
  };

  if (options.devTool) {
    config.devtool = options.devTool;
  }

  return config;
};