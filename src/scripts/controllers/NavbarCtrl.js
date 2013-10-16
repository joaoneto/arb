define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.NavbarCtrl', [])

    .controller('NavbarCtrl', ['$scope', 'conf', 'Auth', function ($scope, conf, Auth) {
      $scope.appName = conf.get('appName');
    }])
});
