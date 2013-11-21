angular.module('arb.common.security.Auth', [])

.factory('Auth', ['$rootScope', '$q', 'ArbRest', 'sessionStorage',
  function ($rootScope, $q, ArbRest, sessionStorage) {
    var Session = ArbRest.all('session');

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
        self.user = Session.get('')
          .then(function (user) {
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
      var req = Session.post({ email: data.email, password: data.password });

      req.then(function (user) {
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

      return Session.customDELETE();
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
