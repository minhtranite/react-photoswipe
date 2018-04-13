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
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
  };

  static defaultProps = {
    options: {},
    thumbnailContent: item => (
      <img src={item.src} width="100" height="100" alt=""/>
    ),
    id: '',
    className: '',
    isOpen: false,
    onClose: () => {
    }
  };

  thumbnails = []
  state = {
    isOpen: this.props.isOpen,
    options: this._initOptions()
  };

  _initOptions = () => {
    const { options = {} } = this.props
    return Object.assign({ getThumbBoundsFn: this.getThumbBoundsFn }, options)
  }

  getThumbBoundsFn = (index) => {
    const thumbnail = this.thumbnails[index];
    const img = thumbnail.getElementsByTagName('img')[0];
    const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
    const rect = img.getBoundingClientRect();
    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
  };

  componentWillReceiveProps = (nextProps) => {
    const { isOpen } = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.setState({ isOpen: true });
      }
    } else if (isOpen) {
      this.setState({ isOpen: false });
    }
  };

  showPhotoSwipe = index => (e) => {
    e.preventDefault();
    this.setState(prevState => ({
      isOpen: true,
      options: { ...prevState.options, index }
    }));
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    });
    this.props.onClose();
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
