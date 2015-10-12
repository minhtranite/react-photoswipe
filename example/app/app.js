import 'babel-core/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import {PhotoSwipe, PhotoSwipeGallery} from 'react-photoswipe';

import './bower_components/bootstrap-customize/css/bootstrap.css';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import './assets/styles/app.scss';

class App extends React.Component {
  state = {
    isOpen: false,
    items: [
      {
        src: 'http://lorempixel.com/1200/900/sports/1',
        w: 1200,
        h: 900,
        title: 'Image 1'
      },
      {
        src: 'http://lorempixel.com/1200/900/sports/2',
        w: 1200,
        h: 900,
        title: 'Image 2'
      },
      {
        src: 'http://lorempixel.com/1200/900/sports/3',
        w: 1200,
        h: 900,
        title: 'Image 3'
      }
    ],
    galleryItems: [
      {
        src: 'http://lorempixel.com/1200/900/nightlife/1',
        thumbnail: 'http://lorempixel.com/120/90/nightlife/1',
        w: 1200,
        h: 900,
        title: 'Image 1'
      },
      {
        src: 'http://lorempixel.com/1200/900/nightlife/2',
        thumbnail: 'http://lorempixel.com/120/90/nightlife/2',
        w: 1200,
        h: 900,
        title: 'Image 2'
      },
      {
        src: 'http://lorempixel.com/1200/900/nightlife/3',
        thumbnail: 'http://lorempixel.com/120/90/nightlife/3',
        w: 1200,
        h: 900,
        title: 'Image 3'
      },
      {
        src: 'http://lorempixel.com/1200/900/nightlife/4',
        thumbnail: 'http://lorempixel.com/120/90/nightlife/4',
        w: 1200,
        h: 900,
        title: 'Image 4'
      }
    ],
    options: {}
  };

  openPhotoSwipe = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: true,
      options: {
        closeOnScroll: false
      }
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  getThumbnailContent = (item) => {
    return (
      <img src={item.thumbnail} with={120} height={90}/>
    );
  };

  render() {
    return (
      <div className={"layout-page"}>
        <Header/>
        <main className={"layout-main"}>
          <div className={"container"}>
            <h2>PhotoSwipe</h2>
            <hr/>
            <button className='btn btn-primary' onClick={this.openPhotoSwipe}>
              Click me
            </button>
            <PhotoSwipe isOpen={this.state.isOpen} items={this.state.items}
              options={this.state.options}
              onClose={this.handleClose}/>
            <hr/>
            <h2>PhotoSwipeGallery</h2>
            <hr/>
            <PhotoSwipeGallery items={this.state.galleryItems}
              thumbnailContent={this.getThumbnailContent}/>
          </div>
        </main>
        <Footer/>
      </div>
    );
  }
}

function run() {
  ReactDOM.render(<App />, document.getElementById('app'));
}

if (window.addEventListener) {
  window.addEventListener('DOMContentLoaded', run);
} else {
  window.attachEvent('onload', run);
}
