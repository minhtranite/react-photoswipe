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

var _photoswipe = require('photoswipe');

var _photoswipe2 = _interopRequireDefault(_photoswipe);

var _photoswipeDistPhotoswipeUiDefaultJs = require('photoswipe/dist/photoswipe-ui-default.js');

var _photoswipeDistPhotoswipeUiDefaultJs2 = _interopRequireDefault(_photoswipeDistPhotoswipeUiDefaultJs);

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
      if (_this.props.isOpen) {
        _this.openPhotoSwipe(_this.props.items, _this.props.options);
      }
    };

    this.componentWillReceiveProps = function (nextProps) {
      if (nextProps.isOpen) {
        if (!_this.state.isOpen) {
          _this.openPhotoSwipe(nextProps.items, nextProps.options);
        } else {
          _this.photoSwipe.items.length = 0;
          nextProps.items.forEach(function (item) {
            _this.photoSwipe.items.push(item);
          });
          _this.photoSwipe.invalidateCurrItems();
          _this.photoSwipe.updateSize(true);
        }
      } else if (_this.state.isOpen) {
        _this.photoSwipe.close();
      }
    };

    this.componentWillUnmount = function () {
      if (_this.photoSwipe) {
        _this.photoSwipe.close();
      }
    };

    this.openPhotoSwipe = function (items, options) {
      var pswpElement = _react2['default'].findDOMNode(_this);
      _this.photoSwipe = new _photoswipe2['default'](pswpElement, _photoswipeDistPhotoswipeUiDefaultJs2['default'], items, options);
      _this.photoSwipe.listen('close', _this.handleClose);
      _this.setState({
        isOpen: true
      }, function () {
        _this.photoSwipe.init();
      });
    };

    this.handleClose = function () {
      _this.setState({
        isOpen: false
      }, function () {
        if (_this.props.onClose) {
          _this.props.onClose();
        }
      });
    };
  }

  _createClass(PhotoSwipe, [{
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'pswp', tabIndex: '-1', role: 'dialog', 'aria-hidden': 'true' },
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
      onClose: _react2['default'].PropTypes.func
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