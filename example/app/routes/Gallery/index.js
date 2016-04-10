export default {
  path: 'gallery',
  getComponent(location, callback) {
    require.ensure([], require => {
      callback(null, require('components/pages/Gallery'));
    }, 'page-gallery');
  }
};
