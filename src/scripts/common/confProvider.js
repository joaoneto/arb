angular.module('arb.common.confProvider', [])

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
      getApiUrl: function () {
        return conf.baseUrl +
          (conf.port ? ':' + conf.port : '') +
          (conf.version ? '/' + conf.version : '');
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
