define(['angular'], function (angular) {
  return angular
    .module('arb.controllers.LoginCtrl', [])

    .controller('LoginCtrl', ['$scope', '$location', 'Page', 'Auth',
      function ($scope, $location, Page, Auth, currentUser) {
        Page.setTitle('Login');

        $scope.data = {};
        $scope.currentUser = currentUser;

        console.log('isLoggedIn', Auth.isLoggedIn())

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

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/login', {
          controller: 'LoginCtrl',
          templateUrl: 'partials/login.html'
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

});
