define(['angular'], function () {
  return angular.module('arb.lib.conf', [])
    .provider('conf', [function () {
      this.conf = {
        appName: 'arb'
      };

      this.$get = function () {
        var conf = this.conf;
        return {
          get: function (key) {
            return conf[key];
          }
        };
      };

      this.set = function (key, value) {
        return this.conf[key] = value;
      };
    }])
});
