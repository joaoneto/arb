angular
  .module('arb.modules.login.LoginCtrl', [])
  .controller('LoginCtrl', ['$scope', '$state', 'Page', 'Auth',
    function ($scope, $state, Page, Auth) {
      console.log('LoginCtrl called');
      Page.set('title', 'Login');

      $scope.data = {};

      $scope.login = function (success, error) {
        Auth.login($scope.data).then(function (data) {
          console.info('Logged in!');
          $state.go('home');
        }, function (resp) {
          console.error('Crap, login error!');
        });
      };
    }
  ])

  .config(['$stateProvider', '$urlRouterProvider', 'resolverProvider',
    function ($stateProvider, $urlRouterProvider, resolverProvider) {
      $stateProvider
        .state('login', {
          parent: 'home',
          url: 'login',
          views: {
            'container@root' : {
              templateUrl: 'scripts/modules/login/login.html',
              controller: 'LoginCtrl'
            },
          },
        })
        .state('logout', {
          url: 'logout',
          onEnter: ['$state', 'Auth', function ($state, Auth) {
            console.log('logout!');
            Auth.logout().then(function (data) {
              $state.go('home');
            });
          }]
        })
    }])
