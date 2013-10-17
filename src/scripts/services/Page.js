define(['angular'], function (angular) {
  return angular
    .module('arb.services.Page', [])

    .factory('Page', ['$rootScope', function ($rootScope) {
      $rootScope.title = 'ARB';

      return {
        getTitle: function () {
          return $rootScope.title;
        },
        setTitle: function (newTitle) {
          $rootScope.title = newTitle;
        }
      };
    }])

});
