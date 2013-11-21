angular.module('arb.common.app.AppCtrl', [
  'ui.bootstrap',
  'ui.router'
])

.controller('AppCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'Notifications',
  function ($scope, $rootScope, $state, Page, Auth, Notifications) {
    console.log('AppCtrl called');
    Page.set('title', 'Home');
    $scope.name = 'I am AppCtrl';

    // setInterval(function () {
    //   Page.set('title', new Date().getTime())
    //   Notifications.remove('bla', 0);
    //   Notifications.add('bla', { test: new Date().getTime() });
    //   $scope.$apply()
    // }, 1000);
  }
])

.config(['$stateProvider', '$urlRouterProvider', 'resolverProvider',
  function ($stateProvider, $urlRouterProvider, resolverProvider) {
    resolverProvider.add({
      currentUser: ['Auth', function (Auth) {
        return Auth.currentUser();
      }]
    })

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('root', {
      abstract: true,
      views: {
        'root': {
          templateUrl: 'scripts/common/app/layouts/default.tpl.html',
          controller: 'AppCtrl',
          resolve: {
            currentUser: ['Auth', function (Auth) {
              return Auth.currentUser();
            }]
          }
        }
      }
    })
  }
])

// debug
.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
])
