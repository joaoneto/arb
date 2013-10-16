define(['angular'], function () {
  return angular.module('arb.lib.sessionStorage', [])
    .factory('sessionStorage', ['$window', function ($window) {
      var storage = $window.sessionStorage;

      return {
        get: function (key) {
          return storage.getItem(key);
        },
        set: function (key, val) {
          return storage.setItem(key, val);
        },
        unset: function (key) {
          return storage.removeItem(key);
        }
      };
    }])
});
