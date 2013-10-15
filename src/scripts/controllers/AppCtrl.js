define(['angular'], function (angular) {
  console.log('aqui')

  return angular
    .module('arb.controllers.AppCtrl', [])

    .controller('AppCtrl', ['$scope', '$state', function ($scope, $state) {
      $scope.name = 'I am AppCtrl';
      $state.go('test');
    }])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          controller: 'AppCtrl',
          templateUrl: 'partials/default.html'
        });
    }])

    .config(function ($stateProvider){
      $stateProvider.state('test', {
        views: {
          '': {
            template: '<p>State test</p>'
          }
        }
      });
    })

});
