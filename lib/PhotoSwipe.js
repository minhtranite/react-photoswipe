'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _photoswipe = require('photoswipe');

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeDistPhotoswipeUiDefault = require('photoswipe/dist/photoswipe-ui-default');

var _photoswipeDistPhotoswipeUiDefault2 = _interopRequireDefault(_photoswipeDistPhotoswipeUiDefault);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

var PhotoSwipe = (function (_React$Component) {
  _inherits(PhotoSwipe, _React$Component);

  function PhotoSwipe() {
    var _this = this;

    _classCallCheck(this, PhotoSwipe);

    _get(Object.getPrototypeOf(PhotoSwipe.prototype), 'constructor', this).apply(this, arguments);

    this.state = {
      isOpen: false
    };

    this.componentDidMount = function () {
      var isOpen = _this.state.isOpen;

      if (isOpen) {
        _this.openPhotoSwipe(_this.props);
      }
    };

    this.componentWillReceiveProps = function (nextProps) {
      var isOpen = _this.state.isOpen;

      if (nextProps.isOpen) {
        if (!isOpen) {
          _this.openPhotoSwipe(nextProps);
        } else {
          _this.updateItems(nextProps.items);
        }
      } else if (isOpen) {
        _this.closePhotoSwipe();
      }
    };

    this.componentWillUnmount = function () {
      _this.closePhotoSwipe();
    };

    this.openPhotoSwipe = function (props) {
      var items = props.items;
      var options = props.options;

      var other = _objectWithoutProperties(props, ['items', 'options']);

      var pswpElement = _reactDom2['default'].findDOMNode(_this);
      _this.photoSwipe = new _photoswipe2['default'](pswpElement, _photoswipeDistPhotoswipeUiDefault2['default'], items, options);
      _events2['default'].forEach(function (event) {
        var callback = props[event];
        if (callback || event === 'destroy') {
          (function () {
            var self = _this;
            _this.photoSwipe.listen(event, function () {
              if (callback) {
                var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
                args.unshift(this);
                callback.apply(undefined, _toConsumableArray(args));
              }
              if (event === 'destroy') {
                self.handleClose();
              }
            });
          })();
        }
      });
      _this.setState({
        isOpen: true
      }, function () {
        _this.photoSwipe.init();
      });
    };

    this.updateItems = function () {
      var items = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      _this.photoSwipe.items.length = 0;
      items.forEach(function (item) {
        _this.photoSwipe.items.push(item);
      });
      _this.photoSwipe.invalidateCurrItems();
      _this.photoSwipe.updateSize(true);
    };

    this.closePhotoSwipe = function () {
      if (!_this.photoSwipe) {
        return;
      }
      _this.photoSwipe.close();
    };

    this.handleClose = function () {
      var onClose = _this.props.onClose;

      _this.setState({
        isOpen: false
      }, function () {
        if (onClose) {
          onClose();
        }
      });
    };
  }

  _createClass(PhotoSwipe, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var id = _props.id;
      var className = _props.className;

      className = (0, _classnames2['default'])(['pswp', className]).trim();
      return _react2['default'].createElement(
        'div',
        { id: id,
          className: className,
          tabIndex: '-1',
          role: 'dialog',
          'aria-hidden': 'true' },
        _react2['default'].createElement('div', { className: 'pswp__bg' }),
        _react2['default'].createElement(
          'div',
          { className: 'pswp__scroll-wrap' },
          _react2['default'].createElement(
            'div',
            { className: 'pswp__container' },
            _react2['default'].createElement('div', { className: 'pswp__item' }),
            _react2['default'].createElement('div', { className: 'pswp__item' }),
            _react2['default'].createElement('div', { className: 'pswp__item' })
          ),
          _react2['default'].createElement(
            'div',
            { className: 'pswp__ui pswp__ui--hidden' },
            _react2['default'].createElement(
              'div',
              { className: 'pswp__top-bar' },
              _react2['default'].createElement('div', { className: 'pswp__counter' }),
              _react2['default'].createElement('button', { className: 'pswp__button pswp__button--close',
                title: 'Close (Esc)' }),
              _react2['default'].createElement('button', { className: 'pswp__button pswp__button--share',
                title: 'Share' }),
              _react2['default'].createElement('button', { className: 'pswp__button pswp__button--fs',
                title: 'Toggle fullscreen' }),
              _react2['default'].createElement('button', { className: 'pswp__button pswp__button--zoom',
                title: 'Zoom in/out' }),
              _react2['default'].createElement(
                'div',
                { className: 'pswp__preloader' },
                _react2['default'].createElement(
                  'div',
                  { className: 'pswp__preloader__icn' },
                  _react2['default'].createElement(
                    'div',
                    { className: 'pswp__preloader__cut' },
                    _react2['default'].createElement('div', { className: 'pswp__preloader__donut' })
                  )
                )
              )
            ),
            _react2['default'].createElement(
              'div',
              {
                className: 'pswp__share-modal pswp__share-modal--hidden pswp__single-tap' },
              _react2['default'].createElement('div', { className: 'pswp__share-tooltip' })
            ),
            _react2['default'].createElement('button', { className: 'pswp__button pswp__button--arrow--left',
              title: 'Previous (arrow left)' }),
            _react2['default'].createElement('button', { className: 'pswp__button pswp__button--arrow--right',
              title: 'Next (arrow right)' }),
            _react2['default'].createElement(
              'div',
              { className: 'pswp__caption' },
              _react2['default'].createElement('div', { className: 'pswp__caption__center' })
            )
          )
        )
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      isOpen: _react2['default'].PropTypes.bool.isRequired,
      items: _react2['default'].PropTypes.array.isRequired,
      options: _react2['default'].PropTypes.object,
      onClose: _react2['default'].PropTypes.func,
      id: _react2['default'].PropTypes.string,
      className: _react2['default'].PropTypes.string
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      items: [],
      options: {}
    },
    enumerable: true
  }]);

  return PhotoSwipe;
})(_react2['default'].Component);

exports['default'] = PhotoSwipe;
module.exports = exports['default'];