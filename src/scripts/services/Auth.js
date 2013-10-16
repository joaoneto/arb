define([
  'angular',
  'lib/session-storage'
], function (angular) {
  return angular.module('arb.services.Auth', ['arb.lib.sessionStorage'])
    .factory('Auth', ['$http', 'conf', 'sessionStorage', function ($http, conf, sessionStorage) {
      var uri = conf.get('baseUrl') + '/session';

      function Auth() {
      }

      Auth.prototype.login = function (data) {
        var req = $http.post(uri, data, { withCredentials: true });
        req.then(function () {
          sessionStorage.set('authenticated', true);
        }, function () {
          sessionStorage.unset('authenticated');
        });
        return req;
      };

      Auth.prototype.logout = function (data) {
        sessionStorage.unset('authenticated');
        return $http.delete(uri, { withCredentials: true });
      };

      Auth.prototype.isLoggedIn = function () {
        return sessionStorage.get('authenticated');
      };

      return new Auth;
    }])

});
