'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _PhotoSwipeJs = require('./PhotoSwipe.js');

var _PhotoSwipeJs2 = _interopRequireDefault(_PhotoSwipeJs);

var _lodashPick = require('lodash.pick');

var _lodashPick2 = _interopRequireDefault(_lodashPick);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
        options.getThumbBoundsFn = options.getThumbBoundsFn || function (index) {
          var thumbnail = _reactDom2['default'].findDOMNode(_this.refs['thumbnail' + index]);
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

      var _props = this.props;
      var id = _props.id;
      var className = _props.className;
      var items = _props.items;
      var thumbnailContent = _props.thumbnailContent;

      var other = _objectWithoutProperties(_props, ['id', 'className', 'items', 'thumbnailContent']);

      className = (0, _classnames2['default'])(['pswp-gallery', className]).trim();
      var eventProps = (0, _lodashPick2['default'])(other, _events2['default']);
      var _state = this.state;
      var isOpen = _state.isOpen;
      var options = _state.options;

      return _react2['default'].createElement(
        'div',
        { id: id, className: className },
        _react2['default'].createElement(
          'div',
          { className: 'pswp-thumbnails' },
          items.map(function (item, index) {
            return _react2['default'].createElement(
              'div',
              { key: index, ref: 'thumbnail' + index,
                className: 'pswp-thumbnail',
                onClick: _this2.showPhotoSwipe(index) },
              thumbnailContent(item)
            );
          })
        ),
        _react2['default'].createElement(_PhotoSwipeJs2['default'], _extends({}, eventProps, {
          isOpen: isOpen,
          items: items,
          options: options,
          onClose: this.handleClose }))
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      items: _react2['default'].PropTypes.array.isRequired,
      options: _react2['default'].PropTypes.object,
      thumbnailContent: _react2['default'].PropTypes.func,
      id: _react2['default'].PropTypes.string,
      className: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      options: {},
      thumbnailContent: function thumbnailContent(item) {
        return _react2['default'].createElement('img', { src: item.src, width: '100', height: '100' });
      }
    },
    enumerable: true
  }]);

  return PhotoSwipeGallery;
})(_react2['default'].Component);

exports['default'] = PhotoSwipeGallery;
module.exports = exports['default'];