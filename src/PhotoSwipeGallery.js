import React from 'react';
import PhotoSwipe from './PhotoSwipe.js';

class PhotoSwipeGallery extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    options: React.PropTypes.object,
    thumbnailContent: React.PropTypes.func
  };

  static defaultProps = {
    options: {},
    thumbnailContent: (item) => {
      return (
        <img src={item.src} with='100' height='100'/>
      );
    }
  };

  state = {
    isOpen: false,
    options: this.props.options
  };

  showPhotoSwipe = (itemIndex) => {
    return (e) => {
      e.preventDefault();
      let options = this.state.options;
      options.index = itemIndex;
      options.getThumbBoundsFn = (index) => {
        let thumbnail = React.findDOMNode(this.refs['thumbnail' + index]);
        let img = thumbnail.getElementsByTagName('img')[0];
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        let rect = img.getBoundingClientRect();
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      };
      this.setState({
        isOpen: true,
        options: options
      });
    };
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <div className='pswp-gallery'>
        <div className='pswp-thumbnails'>
          {this.props.items.map((item, index) => {
            return (
              <div key={index} ref={'thumbnail' + index}
                className='pswp-thumbnail'
                onClick={this.showPhotoSwipe(index)}>
                {this.props.thumbnailContent(item)}
              </div>
            );
          })}
        </div>
        <PhotoSwipe isOpen={this.state.isOpen} items={this.props.items}
          options={this.state.options} onClose={this.handleClose}/>
      </div>
    );
  }
}

export default PhotoSwipeGallery;
