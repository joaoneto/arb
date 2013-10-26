define(['angular'], function () {
  return angular.module('arb.lib.resolver', [])
    .provider('resolver', [function () {
      this.$get = angular.noop;
      this.resolvers = {};

      function _copy(add, toSrc, filter) {
        var i = filter.length, name = '';

        while (i--) {
          name = filter[i];
          toSrc[name] = add[name];
        }
      }

      this.add = function (key, value) {
        if ('string' === typeof key) {
          this.resolvers[key] = value;
        } else {
          _copy(key, this.resolvers, Object.keys(key));
        }

        return this;
      };

      this.get = function (required) {
        var result = {};

        _copy(this.resolvers, result, required);

        return result;
      };

    }])
});
