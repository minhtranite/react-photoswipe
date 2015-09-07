'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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