import React from 'react';
import PhotoSwipeFn from 'photoswipe';
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

class PhotoSwipe extends React.Component {
  static propTypes = {
    isOpen: React.PropTypes.bool.isRequired,
    items: React.PropTypes.array.isRequired,
    options: React.PropTypes.object,
    onClose: React.PropTypes.func
  };
  static defaultProps = {
    items: [],
    options: {}
  };

  state = {
    isOpen: false
  };

  componentDidMount = () => {
    if (this.props.isOpen) {
      this.openPhotoSwipe(this.props.items, this.props.options);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isOpen) {
      if (!this.state.isOpen) {
        this.openPhotoSwipe(nextProps.items, nextProps.options);
      } else {
        this.photoSwipe.items.length = 0;
        nextProps.items.forEach((item) => {
          this.photoSwipe.items.push(item);
        });
        this.photoSwipe.invalidateCurrItems();
        this.photoSwipe.updateSize(true);
      }
    } else if (this.state.isOpen) {
      this.photoSwipe.close();
    }
  };

  componentWillUnmount = () => {
    this.photoSwipe.destroy();
  };

  openPhotoSwipe = (items, options) => {
    let pswpElement = React.findDOMNode(this);
    this.photoSwipe = new PhotoSwipeFn(pswpElement, PhotoSwipeUIDefault, items, options);
    this.photoSwipe.listen('close', this.handleClose);
    this.setState({
      isOpen: true
    }, () => {
      this.photoSwipe.init();
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: false
    }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  };

  render() {
    return (
      <div className='pswp' tabIndex='-1' role='dialog' aria-hidden='true'>
        <div className='pswp__bg'></div>
        <div className='pswp__scroll-wrap'>
          <div className='pswp__container'>
            <div className='pswp__item'></div>
            <div className='pswp__item'></div>
            <div className='pswp__item'></div>
          </div>
          <div className='pswp__ui pswp__ui--hidden'>
            <div className='pswp__top-bar'>
              <div className='pswp__counter'></div>
              <button className='pswp__button pswp__button--close'
                title='Close (Esc)'></button>
              <button className='pswp__button pswp__button--share'
                title='Share'></button>
              <button className='pswp__button pswp__button--fs'
                title='Toggle fullscreen'></button>
              <button className='pswp__button pswp__button--zoom'
                title='Zoom in/out'></button>
              <div className='pswp__preloader'>
                <div className='pswp__preloader__icn'>
                  <div className='pswp__preloader__cut'>
                    <div className='pswp__preloader__donut'></div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='pswp__share-modal pswp__share-modal--hidden pswp__single-tap'>
              <div className='pswp__share-tooltip'></div>
            </div>
            <button className='pswp__button pswp__button--arrow--left'
              title='Previous (arrow left)'>
            </button>
            <button className='pswp__button pswp__button--arrow--right'
              title='Next (arrow right)'></button>
            <div className='pswp__caption'>
              <div className='pswp__caption__center'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PhotoSwipe;
