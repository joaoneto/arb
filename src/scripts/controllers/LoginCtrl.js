angular
  .module('arb.controllers.LoginCtrl', [])

  .controller('LoginCtrl', ['$scope', '$location', 'Page', 'Auth',
    function ($scope, $location, Page, Auth) {
      console.log('LoginCtrl called');
      Page.set('title', 'Login');

      $scope.data = {};

      $scope.login = function (success, error) {
        Auth.login($scope.data).then(function (data) {
          console.info('Logged in!');
          $location.path('/');
        }, function (resp) {
          console.error('Crap, login error!');
        });
      };
    }
  ])

  .config(['$routeProvider', 'resolverProvider', function ($routeProvider, resolverProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginCtrl',
        templateUrl: 'partials/login.html',
        resolve: resolverProvider.get(['currentUser'])
      })
      .when('/logout', {
        controller: ['$location', 'Auth', function ($location, Auth) {
          Auth.logout().then(function (data) {
            $location.path('/');
          });
        }],
        templateUrl: 'partials/login.html'
      });
  }])
