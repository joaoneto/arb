define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.NavbarCtrl', [])

    .controller('NavbarCtrl', ['$scope', 'conf', function ($scope, conf) {
      console.log('NavbarCtrl called');
      $scope.appName = conf.get('appName');
    }])
});
