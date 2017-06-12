import url from 'url';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import httpProxy from 'http-proxy';
import webpackConfig from './webpack.config.babel';

const devURL = process.env.npm_package_config_devURL || 'http://localhost:3000';
const urlParts = url.parse(devURL);
const proxyOptions = process.env.npm_package_config_proxy || [];

const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true
});

const compiler = webpack(webpackConfig);

const app = express();

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    version: false,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use('/assets', express.static(path.join(__dirname, 'app/assets')));

proxyOptions.forEach((option) => {
  app.all(option.path, (req, res) => {
    proxy.web(req, res, option, (err) => {
      console.log(err.message);
      res.statusCode = 502;
      res.end();
    });
  });
});

app.get('*', (req, res, next) => {
  const filename = path.join(compiler.outputPath, 'index.html');
  compiler.outputFileSystem.readFile(filename, (error, result) => {
    if (error) {
      next(error);
    } else {
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    }
  });
});

let server = http.createServer(app);
if (urlParts.protocol === 'https:') {
  server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem'))
  }, app);
}

server.listen(urlParts.port, () => {
  console.log(`Listening at ${devURL}`);
});
