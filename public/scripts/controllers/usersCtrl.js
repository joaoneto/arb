define('controllers/usersCtrl', ['ngRequirePackage'], function (ngRequirePackage) {
  function usersCtrl($scope) {
    $scope.test = 'Olá';
  }

  return new ngRequirePackage({
    name: 'arb.controllers.usersCtrl',
    type: 'controller',
    // dependencies: [],
    object: ['$scope', usersCtrl]
  });
});
