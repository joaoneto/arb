define([
  'angular',
  'lib/session-storage'
], function (angular) {
  return angular
    .module('arb.services.Auth', ['arb.lib.sessionStorage'])

    .factory('Auth', ['$http', '$q', 'conf', 'sessionStorage',
      function ($http, $q, conf, sessionStorage) {
        var uri = conf.get('baseUrl') + '/session';

        function Auth() {
          this.user = null;
        }

        Auth.prototype._destroy = function () {
          this.user = null;
          sessionStorage.unset('authenticated');
        };

        Auth.prototype.currentUser = function () {
          var self = this;
          var defered = $q.defer();

          if (!self.user && self.isLoggedIn()) {
            self.user = $http.get(uri, { withCredentials: true })
              .then(function (res) {
                self.user = res.data;
                defered.resolve(res.data);
              }, function (err) {
                self._destroy();
                defered.reject(err);
              });
          } else {
            defered.resolve(self.user);
          }

          return defered.promise;
        };

        Auth.prototype.login = function (data) {
          var self = this;
          var req = $http.post(uri, data, { withCredentials: true });

          req.then(function (res) {
            sessionStorage.set('authenticated', true);
            self.user = res.data;
          }, function (err) {
            self._destroy();
          });

          return req;
        };

        Auth.prototype.logout = function (data) {
          this._destroy();

          return $http.delete(uri, { withCredentials: true });
        };

        Auth.prototype.isLoggedIn = function () {
          return sessionStorage.get('authenticated');
        };

        Auth.prototype.checkRole = function (role) {
          return this.isLoggedIn() && this.user.role.indexOf(role) >= 0;
        };

        return new Auth;
      }
    ])

});
