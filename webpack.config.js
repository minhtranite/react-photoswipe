import webpack from 'webpack';
import path from 'path';
import camelCase from 'camelcase';
import pkg from './package.json';

const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1);

const webpackConfig = {
  output: {
    filename: `${pkg.name}.js`,
    library: capitalizeFirstLetter(camelCase(pkg.name)),
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs: 'prop-types',
      commonjs2: 'prop-types',
      amd: 'prop-types'
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: path.join(__dirname, '.eslintrc'),
            failOnError: true,
            emitError: true
          }
        },
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false,
    //   compress: {
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   }
    })
  ]
};

export default webpackConfig;
