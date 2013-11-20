angular
  .module('arb.common.controllers.UsersCtrl', [])

  .controller('UsersCtrl', ['$scope', function ($scope) {
    $scope.name = 'I am UsersCtrl';
  }])

  .config(['$stateProvider', function ($stateProvider) {
    // $stateProvider
    //   .when('/profile', {
    //     controller: 'UsersCtrl',
    //     templateUrl: 'partials/profile.html'
    //   });
  }])
