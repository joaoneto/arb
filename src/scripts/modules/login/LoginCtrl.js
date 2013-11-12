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
        .state('arb.login', {
          url: 'login',
          views: { 
            'container' : { 
              templateUrl: 'scripts/feature/login/login.html',
              controller: 'LoginCtrl'
            }
          },
        })
        .state('logout', {
          url: 'logout',
          views: { 
            'container' : { template: 'arb.login.container' }
          },
          controller: ['$location', 'Auth', function ($location, Auth) {
            Auth.logout().then(function (data) {
              $location.path('/');
            });
          }],
          templateUrl: 'scripts/feature/login/login.html'
        })

      // $routeProvider
      //   .when('/login', {
      //     controller: 'LoginCtrl',
      //     templateUrl: 'scripts/feature/login/login.html',
      //     resolve: resolverProvider.get(['currentUser'])
      //   })
      //   .when('/logout', {
      //     controller: ['$location', 'Auth', function ($location, Auth) {
      //       Auth.logout().then(function (data) {
      //         $location.path('/');
      //       });
      //     }],
      //     templateUrl: 'scripts/feature/login/login.html'
      //   });
    }])
