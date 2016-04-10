import React from 'react';
import Document from 'components/common/Document';
import {PhotoSwipe} from 'react-photoswipe';

class HomePage extends React.Component {
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
    options: {
      closeOnScroll: false
    }
  };

  openPhotoSwipe = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: true
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  handleBeforeChange = (instance, change) => {
    console.log('Before change: ', change);
  };

  render() {
    let {isOpen, items, options} = this.state;
    return (
      <Document title="Home | ReactPhotoswipe" className="page-home">
        <div>
          <div className="page-header">
            <h1>Photoswipe</h1>
          </div>
          <button className="btn btn-primary" onClick={this.openPhotoSwipe}>
            Open photoswipe
          </button>
          <PhotoSwipe id="my-photoswipe"
            isOpen={isOpen}
            items={items}
            options={options}
            beforeChange={this.handleBeforeChange}
            onClose={this.handleClose}/>
        </div>
      </Document>
    );
  }
}

export default HomePage;
