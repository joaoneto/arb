angular.module('arb.modules.profile.ProfileCtrl', [])

.controller('ProfileCtrl', ['$scope', function ($scope) {
  $scope.name = 'I am ProfileCtrl';
}])

.config(['$stateProvider', function ($stateProvider) {
  // $stateProvider
  //   .state('/profile', {
  //     controller: 'ProfileCtrl',
  //     templateUrl: 'partials/profile.html'
  //   });
}])
