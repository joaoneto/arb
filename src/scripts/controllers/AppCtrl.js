define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.AppCtrl', [])

    .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'currentUser',
      function ($scope, $rootScope, $state, Page, Auth, currentUser) {
        console.log('AppCtrl called');
        Page.setTitle('Home');
        $scope.name = 'I am AppCtrl';
        $rootScope.Auth = Auth;
        $rootScope.currentUser = currentUser;
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
