define(['angular'], function () {
  return angular.module('arb.common.conf', [])
    .provider('conf', [function () {
      this.conf = {
        appName: 'arb',
        baseUrl: 'http://api.myserver.com'
      };

      this.$get = function () {
        var conf = this.conf;
        return {
          get: function (key) {
            return conf[key];
          },
          getAll: function () {
            return conf;
          }
        };
      };

      this.set = function (key, value) {
        return this.conf[key] = value;
      };
    }])
});
