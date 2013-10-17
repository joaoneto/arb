define([
  'angular',
  // 'lib/session-storage'
], function (angular) {
  return angular.module('arb.services.Auth', [/*'arb.lib.sessionStorage'*/])
    .factory('Auth', ['$http', '$q', 'conf'/*, 'sessionStorage'*/, function ($http, $q, conf, sessionStorage) {
      var uri = conf.get('baseUrl') + '/session';

      function Auth() {
        this.user = null;
      }

      Auth.prototype.currentUser = function () {
        var self = this;

        if (self.isLoggedIn()) {
          return $q.when(self.user);
        } else {
          return $http.get(uri, { withCredentials: true }).then(function (res) {
            self.user = response.data;
            return self.user;
          });
        }
      };

      Auth.prototype.login = function (data) {
        var self = this;
        var req = $http.post(uri, data, { withCredentials: true });

        req.then(function (res) {
          // sessionStorage.set('authenticated', true);
          self.user = res.data;
        }, function () {
          // sessionStorage.unset('authenticated');
        });
        return req;
      };

      Auth.prototype.logout = function (data) {
        // sessionStorage.unset('authenticated');
        this.user = null;
        return $http.delete(uri, { withCredentials: true });
      };

      Auth.prototype.isLoggedIn = function () {
        // return sessionStorage.get('authenticated');
        return !!this.user;
      };

      return new Auth;
    }])

});
