import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import PhotoSwipe from './PhotoSwipe.js';
import pick from 'lodash.pick';
import events from './events';
import classnames from 'classnames';

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
    thumbnailContent: (item) => {
      return (
        <img src={item.src} width="100" height="100"/>
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
      let {options} = this.state;
      options.index = itemIndex;
      options.getThumbBoundsFn = options.getThumbBoundsFn || ((index) => {
        let thumbnail = ReactDOM.findDOMNode(this.refs['thumbnail' + index]);
        let img = thumbnail.getElementsByTagName('img')[0];
        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
        let rect = img.getBoundingClientRect();
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width};
      });
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
    let {id, className, items, thumbnailContent, ...other} = this.props;
    className = classnames(['pswp-gallery', className]).trim();
    let eventProps = pick(other, events);
    let {isOpen, options} = this.state;
    return (
      <div id={id} className={className}>
        <div className="pswp-thumbnails">
          {items.map((item, index) => {
            return (
              <div key={index} ref={'thumbnail' + index}
                className="pswp-thumbnail"
                onClick={this.showPhotoSwipe(index)}>
                {thumbnailContent(item)}
              </div>
            );
          })}
        </div>
        <PhotoSwipe {...eventProps}
          isOpen={isOpen}
          items={items}
          options={options}
          onClose={this.handleClose}/>
      </div>
    );
  }
}

export default PhotoSwipeGallery;
