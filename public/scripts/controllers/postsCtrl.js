define('controllers/postsCtrl', ['ngRequirePackage'], function (ngRequirePackage) {
  function postsCtrl($scope) {
    $scope.test = 'Hello';
  }

  return new ngRequirePackage({
    name: 'arb.controllers.postsCtrl',
    type: 'controller',
    // dependencies: [],
    object: ['$scope', postsCtrl]
  });
});
