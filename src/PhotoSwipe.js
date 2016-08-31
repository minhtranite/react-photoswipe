import React from 'react';
import ReactDOM from 'react-dom';
import Photoswipe from 'photoswipe';
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default';
import classnames from 'classnames';
import events from './events';

class PhotoSwipe extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    options: React.PropTypes.object,
    onClose: React.PropTypes.func,
    id: React.PropTypes.string,
    className: React.PropTypes.string
  };
  static defaultProps = {
    items: [],
    options: {}
  };

  state = {
    isOpen: this.props.isOpen
  };

  componentDidMount = () => {
    let {isOpen} = this.state;
    if (isOpen) {
      this.openPhotoSwipe(this.props);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    let {isOpen} = this.state;
    if (nextProps.isOpen) {
      if (!isOpen) {
        this.openPhotoSwipe(nextProps);
      } else {
        this.updateItems(nextProps.items);
      }
    } else if (isOpen) {
      this.closePhotoSwipe();
    }
  };

  componentWillUnmount = () => {
    this.closePhotoSwipe();
  };

  openPhotoSwipe = (props) => {
    let {items, options, ...other} = props;
    let pswpElement = ReactDOM.findDOMNode(this);
    this.photoSwipe = new Photoswipe(pswpElement, PhotoswipeUIDefault, items, options);
    events.forEach(event => {
      let callback = props[event];
      if (callback || event === 'destroy') {
        let self = this;
        this.photoSwipe.listen(event, function () {
          if (callback) {
            let args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
            args.unshift(this);
            callback(...args);
          }
          if (event === 'destroy') {
            self.handleClose();
          }
        });
      }
    });
    this.setState({
      isOpen: true
    }, () => {
      this.photoSwipe.init();
    });
  };

  updateItems = (items = []) => {
    this.photoSwipe.items.length = 0;
    items.forEach((item) => {
      this.photoSwipe.items.push(item);
    });
    this.photoSwipe.invalidateCurrItems();
    this.photoSwipe.updateSize(true);
  };

  closePhotoSwipe = () => {
    if (!this.photoSwipe) {
      return;
    }
    this.photoSwipe.close();
  };

  handleClose = () => {
    let {onClose} = this.props;
    this.setState({
      isOpen: false
    }, () => {
      if (onClose) {
        onClose();
      }
    });
  };

  render() {
    let {id, className} = this.props;
    className = classnames(['pswp', className]).trim();
    return (
      <div id={id}
        className={className}
        tabIndex="-1"
        role="dialog"
        aria-hidden="true">
        <div className="pswp__bg"/>
        <div className="pswp__scroll-wrap">
          <div className="pswp__container">
            <div className="pswp__item"/>
            <div className="pswp__item"/>
            <div className="pswp__item"/>
          </div>
          <div className="pswp__ui pswp__ui--hidden">
            <div className="pswp__top-bar">
              <div className="pswp__counter"/>
              <button className="pswp__button pswp__button--close"
                title="Close (Esc)"/>
              <button className="pswp__button pswp__button--share"
                title="Share"/>
              <button className="pswp__button pswp__button--fs"
                title="Toggle fullscreen"/>
              <button className="pswp__button pswp__button--zoom"
                title="Zoom in/out"/>
              <div className="pswp__preloader">
                <div className="pswp__preloader__icn">
                  <div className="pswp__preloader__cut">
                    <div className="pswp__preloader__donut"/>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div className="pswp__share-tooltip"/>
            </div>
            <button className="pswp__button pswp__button--arrow--left"
              title="Previous (arrow left)"/>
            <button className="pswp__button pswp__button--arrow--right"
              title="Next (arrow right)"/>
            <div className="pswp__caption">
              <div className="pswp__caption__center"/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoSwipe;
