const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const ENV = process.env.NODE_ENV || 'development';
const PROD = ENV === 'production';

const plugins = [
  autoprefixer({
    browsers: [
      'last 2 versions'
    ]
  })
];

if (PROD) {
  plugins.push(cssnano({
    safe: true,
    discardComments: {
      removeAll: true
    }
  }));
}

module.exports = {
  plugins
};
