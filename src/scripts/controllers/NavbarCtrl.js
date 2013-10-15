define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.NavbarCtrl', [])

    .controller('NavbarCtrl', ['$scope', 'conf', function ($scope, conf) {
      $scope.appName = conf.get('appName');
    }])
});
