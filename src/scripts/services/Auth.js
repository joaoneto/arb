define([
  'angular',
  'lib/session-storage'
], function (angular) {
  return angular.module('arb.services.Auth', ['arb.lib.sessionStorage'])
    .factory('Auth', ['$resource', 'conf', 'sessionStorage', function ($resource, conf, sessionStorage) {
      var noop = angular.noop;
      var Auth = $resource(conf.get('baseUrl') + 'v1/sessions', {}, {
        // query: { method: 'GET', isArray: 1 },
        save: { method: 'POST' },
        remove: { method: 'DELETE' }
      });

      Auth.prototype.login = function (data, success, error) {
        return Auth.save(data, function () {
          sessionStorage.set('authenticated', true);
          (success || noop).apply(this, arguments);
        }, function () {
          sessionStorage.unset('authenticated');
          (error || noop).apply(this, arguments);
        });
      };

      Auth.prototype.isLoggedIn = function () {
        return sessionStorage.get('authenticated');
      };

      return new Auth;
    }])

});
