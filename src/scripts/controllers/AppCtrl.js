define(['angular'], function (angular) {
  function AppCtrl($scope, $rootScope, $state, Page, Auth, currentUser) {
    console.log('AppCtrl called');
    Page.setTitle('Home');
    $scope.name = 'I am AppCtrl';
    $rootScope.Auth = Auth;
    $rootScope.currentUser = currentUser;
  }

  AppCtrl.resolve = {
    currentUser: ['Auth', function (Auth) {
      return Auth.user;
    }]
  };

  return angular
    .module('arb.controllers.AppCtrl', [])
    .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'currentUser', AppCtrl])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'AppCtrl',
          templateUrl: 'partials/default.html',
          resolve: AppCtrl.resolve
        })
        .otherwise({redirectTo: '/'});
    }])

});
