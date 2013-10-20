define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.AppCtrl', [])

    .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'Notifications',
      function ($scope, $rootScope, $state, Page, Auth, Notifications) {
        console.log('AppCtrl called');
        Page.set('title', 'Home');
        $scope.name = 'I am AppCtrl';

        // setInterval(function () {
        //   Page.set('title', new Date().getTime())
        //   Notifications.remove('bla', 0);
        //   Notifications.add('bla', { test: new Date().getTime() });
        //   $scope.$apply()
        // }, 1000);
      }
    ])

    .config(['$routeProvider', 'resolverProvider', function ($routeProvider, resolverProvider) {
      resolverProvider
        .set({
          currentUser: ['Auth', function (Auth) {
            return Auth.currentUser();
          }]
        })

      $routeProvider
        .when('/', {
          controller: 'AppCtrl',
          templateUrl: 'partials/default.html',
          resolve: resolverProvider.get(['currentUser'])
        })
        .otherwise({redirectTo: '/'});
    }])

});
