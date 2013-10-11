define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.NavbarCtrl', [])

    .controller('NavbarCtrl', ['$scope', 'Config', function ($scope, Config) {
      $scope.appName = Config.appName;
    }])
});
