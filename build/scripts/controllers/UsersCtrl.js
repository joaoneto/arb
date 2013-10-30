define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.UsersCtrl', [])

    .controller('UsersCtrl', ['$scope', function ($scope) {
      $scope.name = 'I am UsersCtrl';
    }])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/profile', {
          controller: 'UsersCtrl',
          templateUrl: 'partials/profile.html'
        });
    }])
});
