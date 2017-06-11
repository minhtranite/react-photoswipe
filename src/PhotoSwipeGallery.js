import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import pick from 'lodash.pick';
import PhotoSwipe from './PhotoSwipe.js';
import events from './events';

class PhotoSwipeGallery extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    options: PropTypes.object,
    thumbnailContent: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    options: {},
    thumbnailContent: item => (
      <img src={item.src} width="100" height="100" alt=""/>
    ),
    id: '',
    className: ''
  };

  state = {
    isOpen: false,
    options: this.props.options
  };

  showPhotoSwipe = itemIndex => (e) => {
    e.preventDefault();
    const getThumbBoundsFn = ((index) => {
      const thumbnail = this.thumbnails[index];
      const img = thumbnail.getElementsByTagName('img')[0];
      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
      const rect = img.getBoundingClientRect();
      return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    });
    const { options } = this.state;
    options.index = itemIndex;
    options.getThumbBoundsFn = options.getThumbBoundsFn || getThumbBoundsFn;
    this.setState({
      isOpen: true,
      options
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  render() {
    const { id, items, thumbnailContent, ...other } = this.props;
    let { className } = this.props;
    className = classnames(['pswp-gallery', className]).trim();
    const eventProps = pick(other, events);
    const { isOpen, options } = this.state;
    return (
      <div id={id} className={className}>
        <div className="pswp-thumbnails">
          {items.map((item, index) => (
            <div
              key={index}
              ref={(node) => {
                this.thumbnails = this.thumbnails || [];
                this.thumbnails[index] = node;
              }}
              className="pswp-thumbnail"
              onClick={this.showPhotoSwipe(index)}
            >
              {thumbnailContent(item)}
            </div>
          ))}
        </div>
        <PhotoSwipe
          {...eventProps}
          isOpen={isOpen}
          items={items}
          options={options}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default PhotoSwipeGallery;
