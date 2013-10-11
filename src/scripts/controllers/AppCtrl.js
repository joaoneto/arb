define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.AppCtrl', [])

    .controller('AppCtrl', ['$scope', function ($scope) {
      $scope.name = 'I am AppCtrl';
    }])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'AppCtrl',
          templateUrl: 'partials/default.html'
        });
    }])
});
