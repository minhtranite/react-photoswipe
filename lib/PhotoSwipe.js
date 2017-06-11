'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _photoswipe = require('photoswipe');

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');

var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhotoSwipe = function (_React$Component) {
  _inherits(PhotoSwipe, _React$Component);

  function PhotoSwipe() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PhotoSwipe);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PhotoSwipe.__proto__ || Object.getPrototypeOf(PhotoSwipe)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PhotoSwipe, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var id = this.props.id;
      var className = this.props.className;

      className = (0, _classnames2.default)(['pswp', className]).trim();
      return _react2.default.createElement(
        'div',
        {
          id: id,
          className: className,
          tabIndex: '-1',
          role: 'dialog',
          'aria-hidden': 'true',
          ref: function ref(node) {
            _this2.pswpElement = node;
          }
        },
        _react2.default.createElement('div', { className: 'pswp__bg' }),
        _react2.default.createElement(
          'div',
          { className: 'pswp__scroll-wrap' },
          _react2.default.createElement(
            'div',
            { className: 'pswp__container' },
            _react2.default.createElement('div', { className: 'pswp__item' }),
            _react2.default.createElement('div', { className: 'pswp__item' }),
            _react2.default.createElement('div', { className: 'pswp__item' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'pswp__ui pswp__ui--hidden' },
            _react2.default.createElement(
              'div',
              { className: 'pswp__top-bar' },
              _react2.default.createElement('div', { className: 'pswp__counter' }),
              _react2.default.createElement('button', {
                className: 'pswp__button pswp__button--close',
                title: 'Close (Esc)'
              }),
              _react2.default.createElement('button', {
                className: 'pswp__button pswp__button--share',
                title: 'Share'
              }),
              _react2.default.createElement('button', {
                className: 'pswp__button pswp__button--fs',
                title: 'Toggle fullscreen'
              }),
              _react2.default.createElement('button', { className: 'pswp__button pswp__button--zoom', title: 'Zoom in/out' }),
              _react2.default.createElement(
                'div',
                { className: 'pswp__preloader' },
                _react2.default.createElement(
                  'div',
                  { className: 'pswp__preloader__icn' },
                  _react2.default.createElement(
                    'div',
                    { className: 'pswp__preloader__cut' },
                    _react2.default.createElement('div', { className: 'pswp__preloader__donut' })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'pswp__share-modal pswp__share-modal--hidden pswp__single-tap' },
              _react2.default.createElement('div', { className: 'pswp__share-tooltip' })
            ),
            _react2.default.createElement('button', {
              className: 'pswp__button pswp__button--arrow--left',
              title: 'Previous (arrow left)'
            }),
            _react2.default.createElement('button', {
              className: 'pswp__button pswp__button--arrow--right',
              title: 'Next (arrow right)'
            }),
            _react2.default.createElement(
              'div',
              { className: 'pswp__caption' },
              _react2.default.createElement('div', { className: 'pswp__caption__center' })
            )
          )
        )
      );
    }
  }]);

  return PhotoSwipe;
}(_react2.default.Component);

PhotoSwipe.propTypes = {
  isOpen: _propTypes2.default.bool.isRequired,
  items: _propTypes2.default.array.isRequired,
  options: _propTypes2.default.object,
  onClose: _propTypes2.default.func,
  id: _propTypes2.default.string,
  className: _propTypes2.default.string
};
PhotoSwipe.defaultProps = {
  options: {},
  onClose: function onClose() {},
  id: '',
  className: ''
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    isOpen: false
  };

  this.componentDidMount = function () {
    var isOpen = _this3.state.isOpen;

    if (isOpen) {
      _this3.openPhotoSwipe(_this3.props);
    }
  };

  this.componentWillReceiveProps = function (nextProps) {
    var isOpen = _this3.state.isOpen;

    if (nextProps.isOpen) {
      if (!isOpen) {
        _this3.openPhotoSwipe(nextProps);
      } else {
        _this3.updateItems(nextProps.items);
      }
    } else if (isOpen) {
      _this3.closePhotoSwipe();
    }
  };

  this.componentWillUnmount = function () {
    _this3.closePhotoSwipe();
  };

  this.openPhotoSwipe = function (props) {
    var items = props.items,
        options = props.options;

    var pswpElement = _this3.pswpElement;
    _this3.photoSwipe = new _photoswipe2.default(pswpElement, _photoswipeUiDefault2.default, items, options);
    _events2.default.forEach(function (event) {
      var callback = props[event];
      if (callback || event === 'destroy') {
        var self = _this3;
        _this3.photoSwipe.listen(event, function () {
          if (callback) {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            args.unshift(this);
            callback.apply(undefined, args);
          }
          if (event === 'destroy') {
            self.handleClose();
          }
        });
      }
    });
    _this3.setState({
      isOpen: true
    }, function () {
      _this3.photoSwipe.init();
    });
  };

  this.updateItems = function () {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _this3.photoSwipe.items.length = 0;
    items.forEach(function (item) {
      _this3.photoSwipe.items.push(item);
    });
    _this3.photoSwipe.invalidateCurrItems();
    _this3.photoSwipe.updateSize(true);
  };

  this.closePhotoSwipe = function () {
    if (!_this3.photoSwipe) {
      return;
    }
    _this3.photoSwipe.close();
  };

  this.handleClose = function () {
    var onClose = _this3.props.onClose;

    _this3.setState({
      isOpen: false
    }, function () {
      if (onClose) {
        onClose();
      }
    });
  };
};

exports.default = PhotoSwipe;
module.exports = exports['default'];