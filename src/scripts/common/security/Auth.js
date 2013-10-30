define('arb.common.security.Auth', [], function (angular) {
  angular
    .module('arb.common.security.Auth', amd(['arb.common.sessionStorage']))

    .factory('Auth', ['$rootScope', '$http', '$q', 'conf', 'sessionStorage',
      function ($rootScope, $http, $q, conf, sessionStorage) {
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
                var user = res.data;
                self.user = user;
                $rootScope.$broadcast('auth.currentuser', user);
                defered.resolve(user);
              }, function (err) {
                self._destroy();
                $rootScope.$broadcast('auth.error', err);
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
            var user = res.data;
            sessionStorage.set('authenticated', true);
            $rootScope.$broadcast('auth.authenticated', user);
            self.user = user;
          }, function (err) {
            $rootScope.$broadcast('auth.error', err);
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
