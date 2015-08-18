'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PhotoSwipeJs = require('./PhotoSwipe.js');

var _PhotoSwipeJs2 = _interopRequireDefault(_PhotoSwipeJs);

var PhotoSwipeGallery = (function (_React$Component) {
  _inherits(PhotoSwipeGallery, _React$Component);

  function PhotoSwipeGallery() {
    var _this = this;

    _classCallCheck(this, PhotoSwipeGallery);

    _get(Object.getPrototypeOf(PhotoSwipeGallery.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      isOpen: false,
      options: this.props.options
    };

    this.showPhotoSwipe = function (itemIndex) {
      return function (e) {
        e.preventDefault();
        var options = _this.state.options;
        options.index = itemIndex;
        options.getThumbBoundsFn = function (index) {
          var thumbnail = _react2['default'].findDOMNode(_this.refs['thumbnail' + index]);
          var img = thumbnail.getElementsByTagName('img')[0];
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var rect = img.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        };
        _this.setState({
          isOpen: true,
          options: options
        });
      };
    };

    this.handleClose = function () {
      _this.setState({
        isOpen: false
      });
    };
  }

  _createClass(PhotoSwipeGallery, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2['default'].createElement(
        'div',
        { className: 'pswp-gallery' },
        _react2['default'].createElement(
          'div',
          { className: 'pswp-thumbnails' },
          this.props.items.map(function (item, index) {
            return _react2['default'].createElement(
              'div',
              { key: index, ref: 'thumbnail' + index,
                className: 'pswp-thumbnail',
                onClick: _this2.showPhotoSwipe(index) },
              _this2.props.thumbnailContent(item)
            );
          })
        ),
        _react2['default'].createElement(_PhotoSwipeJs2['default'], { isOpen: this.state.isOpen, items: this.props.items,
          options: this.state.options, onClose: this.handleClose })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      items: _react2['default'].PropTypes.array.isRequired,
      options: _react2['default'].PropTypes.object,
      thumbnailContent: _react2['default'].PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      options: {},
      thumbnailContent: function thumbnailContent(item) {
        return _react2['default'].createElement('img', { src: item.src, 'with': '100', height: '100' });
      }
    },
    enumerable: true
  }]);

  return PhotoSwipeGallery;
})(_react2['default'].Component);

exports['default'] = PhotoSwipeGallery;
module.exports = exports['default'];