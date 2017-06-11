'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _PhotoSwipe = require('./PhotoSwipe.js');

var _PhotoSwipe2 = _interopRequireDefault(_PhotoSwipe);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoSwipeGallery = function (_React$Component) {
  _inherits(PhotoSwipeGallery, _React$Component);

  function PhotoSwipeGallery() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhotoSwipeGallery);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhotoSwipeGallery.__proto__ || Object.getPrototypeOf(PhotoSwipeGallery)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isOpen: false,
      options: _this.props.options
    }, _this.showPhotoSwipe = function (itemIndex) {
      return function (e) {
        e.preventDefault();
        var getThumbBoundsFn = function getThumbBoundsFn(index) {
          var thumbnail = _this.thumbnails[index];
          var img = thumbnail.getElementsByTagName('img')[0];
          var pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
          var rect = img.getBoundingClientRect();
          return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
        };
        var options = _this.state.options;

        options.index = itemIndex;
        options.getThumbBoundsFn = options.getThumbBoundsFn || getThumbBoundsFn;
        _this.setState({
          isOpen: true,
          options: options
        });
      };
    }, _this.handleClose = function () {
      _this.setState({
        isOpen: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PhotoSwipeGallery, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          id = _props.id,
          items = _props.items,
          thumbnailContent = _props.thumbnailContent,
          other = _objectWithoutProperties(_props, ['id', 'items', 'thumbnailContent']);

      var className = this.props.className;

      className = (0, _classnames2.default)(['pswp-gallery', className]).trim();
      var eventProps = (0, _lodash2.default)(other, _events2.default);
      var _state = this.state,
          isOpen = _state.isOpen,
          options = _state.options;

      return _react2.default.createElement(
        'div',
        { id: id, className: className },
        _react2.default.createElement(
          'div',
          { className: 'pswp-thumbnails' },
          items.map(function (item, index) {
            return _react2.default.createElement(
              'div',
              {
                key: index,
                ref: function ref(node) {
                  _this2.thumbnails = _this2.thumbnails || [];
                  _this2.thumbnails[index] = node;
                },
                className: 'pswp-thumbnail',
                onClick: _this2.showPhotoSwipe(index)
              },
              thumbnailContent(item)
            );
          })
        ),
        _react2.default.createElement(_PhotoSwipe2.default, _extends({}, eventProps, {
          isOpen: isOpen,
          items: items,
          options: options,
          onClose: this.handleClose
        }))
      );
    }
  }]);

  return PhotoSwipeGallery;
}(_react2.default.Component);

PhotoSwipeGallery.propTypes = {
  items: _propTypes2.default.array.isRequired,
  options: _propTypes2.default.object,
  thumbnailContent: _propTypes2.default.func,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string
};
PhotoSwipeGallery.defaultProps = {
  options: {},
  thumbnailContent: function thumbnailContent(item) {
    return _react2.default.createElement('img', { src: item.src, width: '100', height: '100', alt: '' });
  },
  id: '',
  className: ''
};
exports.default = PhotoSwipeGallery;
module.exports = exports['default'];