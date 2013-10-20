define(['angular'], function (angular) {
  return angular
    .module('arb.services.Page', [])

    .factory('Page', ['$rootScope', 'Auth', function ($rootScope, Auth) {
      $rootScope.page = {
        title: 'ARB',
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
