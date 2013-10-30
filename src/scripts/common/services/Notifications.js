define(['arb.common.services.Notifications'], function (angular) {
  angular
    .module('arb.common.services.Notifications', [])

    .factory('Notifications', ['$rootScope', function ($rootScope) {
      function Notifications() {
        this.notifications = {
          info: [],
          warn: [],
          error: []
        };
      }

      Notifications.prototype.add = function (key, value) {
        if (!this.notifications[key]) {
          this.notifications[key] = [];
        }

        this.notifications[key].push(value);
      };

      Notifications.prototype.remove = function (key, index) {
        if (this.notifications[key]) {
          this.notifications[key].splice(index, 1);
        }
      };

      Notifications.prototype.clean = function () {
        this.notifications.info.length = 0;
        this.notifications.warn.length = 0;
        this.notifications.error.length = 0;
      };

      return new Notifications;
    }])

});
