import React from 'react';
import Document from 'components/Document';
import { PhotoSwipeGallery } from 'react-photoswipe';

class GalleryPage extends React.Component {
  state = {
    isOpen: false,
    items: [
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
    options: {
      closeOnScroll: false
    }
  };

  getThumbnailContent = item => (
    <img src={item.thumbnail} width={120} height={90} alt=""/>
  );

  render() {
    const { items, options } = this.state;
    return (
      <Document title="Gallery | ReactPhotoswipe" className="page-gallery">
        <div>
          <div className="page-header">
            <h1>Photoswipe gallery</h1>
          </div>
          <PhotoSwipeGallery
            items={items}
            options={options}
            thumbnailContent={this.getThumbnailContent}
          />
        </div>
      </Document>
    );
  }
}

export default GalleryPage;

