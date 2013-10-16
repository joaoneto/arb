define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.LoginCtrl', [])

    .controller('LoginCtrl', ['$scope', '$state', 'Page', 'Auth', function ($scope, $state, Page, Auth) {
      Page.setTitle('Login');

      $scope.data = {};

      console.log(Auth.isLoggedIn())

      $scope.login = function (success, error) {
        Auth.login($scope.data, function (data) {
          console.info('Logged in!');
        }, function (resp) {
          console.error('Crap, login error!');
        });
      };
    }])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/login', {
          controller: 'LoginCtrl',
          templateUrl: 'partials/login.html'
        });
    }])

});
