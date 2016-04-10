import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import pkg from '../package.json';

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PROD = ENV === 'production';

const scssIncludePaths = [
  path.join(__dirname, '../bower_components'),
  path.join(__dirname, '../node_modules')
];

const autoprefixerOptions = {
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

const webpackConfig = {
  entry: {
    app: PROD
      ? path.join(__dirname, 'app/app.js')
      : ['webpack-hot-middleware/client?reload=true', path.join(__dirname, 'app/app.js')]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: PROD ? '[hash].js' : '[name].js',
    chunkFilename: PROD ? '[chunkhash].js' : '[name].chunk.js',
    hashDigestLength: 32,
    publicPath: PROD ? `/${pkg.name}/` : '/'
  },
  resolve: {
    root: path.join(__dirname, 'app'),
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.jsx', '.js'],
    alias: {
      actions: path.join(__dirname, 'app/actions'),
      assets: path.join(__dirname, 'app/assets'),
      components: path.join(__dirname, 'app/components'),
      constants: path.join(__dirname, 'app/constants'),
      services: path.join(__dirname, 'app/services'),
      stores: path.join(__dirname, 'app/stores'),
      utils: path.join(__dirname, 'app/utils')
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
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: PROD
          ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!')
          : 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: PROD
          ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?outputStyle=expanded&' + scssIncludePaths.join('&includePaths[]='))
          : 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&' + scssIncludePaths.join('&includePaths[]=')
      },
      {
        test: /\.sass$/,
        loader: PROD
          ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader?indentedSyntax=sass')
          : 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax=sass'
      },
      {
        test: /\.less$/,
        loader: PROD
          ? ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
          : 'style-loader!css-loader!postcss-loader!less-loader'
      },
      {
        test: /\.(png|jpg|gif|swf)$/,
        loader: PROD
          ? 'file-loader?name=[hash].[ext]'
          : 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: PROD
          ? 'file-loader?name=[hash].[ext]'
          : 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.html$/,
        loader: 'html-loader?interpolate'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'app/index.html')
    })
  ],
  eslint: {
    configFile: path.join(__dirname, '../.eslintrc'),
    failOnError: false,
    emitError: false
  },
  postcss: () => {
    if (PROD) {
      return [
        autoprefixer(autoprefixerOptions),
        cssnano({
          safe: true,
          discardComments: {removeAll: true}
        })
      ];
    }
    return [autoprefixer(autoprefixerOptions)];
  },
  node: {
    net: 'mock',
    dns: 'mock'
  },
  debug: DEV
};

webpackConfig.resolve.alias[pkg.name + '$'] = path.join(__dirname, '../src/index.js');
webpackConfig.resolve.alias[pkg.name + '/src'] = path.join(__dirname, '../src');

if (DEV) {
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  webpackConfig.devtool = 'eval';
}

if (PROD) {
  webpackConfig.plugins = webpackConfig.plugins.concat([
    new ExtractTextPlugin('[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new ManifestPlugin({
      fileName: 'webpack-manifest.json'
    })
  ]);
  webpackConfig.stats = {
    children: false,
    version: false
  };
  webpackConfig.progress = true;
  webpackConfig.profile = true;
  webpackConfig.bail = true;
}

export default webpackConfig;
