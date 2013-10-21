define(['angular'], function (angular) {
  return angular
    .module('arb.services.Page', [])

    .factory('Page', ['$rootScope', 'conf', 'Auth', function ($rootScope, conf, Auth) {
      $rootScope.page = {
        title: 'ARB',
        appName: conf.get('appName'),
        currentUser: Auth.currentUser()
      };

      return {
        get: function (key) {
          return $rootScope.page[key];
        },
        set: function (key, newTitle) {
          $rootScope.page[key] = newTitle;
        }
      };
    }])

    .run(['$rootScope', 'Page', 'Auth', function ($rootScope, Page, Auth) {
      $rootScope.Page = Page;
      $rootScope.Auth = Auth;
    }])

});
