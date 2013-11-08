angular
  .module('arb.common.controllers.UsersCtrl', [])

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
