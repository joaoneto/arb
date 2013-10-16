define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.AppCtrl', [])

    .controller('AppCtrl', ['$scope', '$state', 'Page', function ($scope, $state, Page) {
      Page.setTitle('Home');
      $scope.Page = Page;
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
