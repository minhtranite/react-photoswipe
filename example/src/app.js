import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/App';

import 'bootstrap/dist/css/bootstrap.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import 'assets/styles/app.scss';

const run = () => {
  ReactDOM.render(<App/>, document.getElementById('app'));
};

window.addEventListener('DOMContentLoaded', run);
