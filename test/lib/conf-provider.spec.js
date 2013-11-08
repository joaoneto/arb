
describe('confProvider', function () {
  var confProvider;
  beforeEach(module('arb'));

  it('should confProvider setup default configuration', inject(function (conf) {
    var defaultConfig = conf.getAll();
    expect(defaultConfig.appName).toEqual('arb');
    expect(defaultConfig.baseUrl).toEqual('http://api.myserver.com');
  }));

  it('should setup appName', function () {
    module(function (confProvider) {
      confProvider.set('appName', 'My app name');
    });
    inject(function (conf) {
      var config = conf.getAll();
      expect(config.appName).toEqual('My app name');
    });
  });

  it('should setup baseUrl', function () {
    module(function (confProvider) {
      confProvider.set('baseUrl', 'http://www.server.com');
    });
    inject(function (conf) {
      var config = conf.getAll();
      expect(config.baseUrl).toEqual('http://www.server.com');
    });
  });

  it('should setup other properties', function () {
    module(function (confProvider) {
      confProvider.set('foo', []);
      confProvider.set('bar', {});
    });
    inject(function (conf) {
      var config = conf.getAll();

      expect(config.foo).toEqual([]);
      expect(config.bar).toEqual({});
    });
  });

});
