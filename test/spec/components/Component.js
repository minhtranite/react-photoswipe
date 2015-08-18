require('../../helper/phantomjs-shims');

describe('Component', function () {
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;
  var Component, component;

  beforeEach(function () {
    Component = require('../../../src/Component');
    component = TestUtils.renderIntoDocument(
      <Component/>
    );
  });

  it('should create a new instance of Component', function () {
    expect(component).toBeDefined();
  });
});
