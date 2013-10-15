define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.AppCtrl', [])

    .controller('AppCtrl', ['$scope', '$state', function ($scope, $state) {
      $scope.name = 'I am AppCtrl';
      $state.go('test');
    }])

    .config(['$routeProvider', '$stateProvider', function ($routeProvider, $stateProvider) {
      $routeProvider
        .when('/', {
          controller: 'AppCtrl',
          templateUrl: 'partials/default.html'
        });

      $stateProvider.state('test', {
        views: {
          '': {
            template: '<p>State test</p>'
          }
        }
      });
    }])

});
