angular.module('arb.common.app.NavbarCtrl', [])

.controller('NavbarCtrl', ['$scope', 'conf', 'Page', function ($scope, conf, Page) {
  console.log('NavbarCtrl called');
  $scope.appName = Page.get('appName');
}])
