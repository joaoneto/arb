angular
  .module('arb.common.controllers.AfricanCtrl', [
    'arb.common.controllers.AppCtrl'
  ])

  .controller('AfricanCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'Notifications',
    function ($scope, $rootScope, $state, Page, Auth, Notifications) {
      console.log('AfricanCtrl called');
      Page.set('title', 'Home');
      $scope.name = 'I am AfricanCtrl';
    }
  ])

  .config(['$stateProvider', '$urlRouterProvider', 'resolverProvider',
    function ($stateProvider, $urlRouterProvider, resolverProvider) {

      $stateProvider
        .state('root.african', {
          abstract: true,
          views: {
            'root': {
              templateUrl: 'templates/layouts/african.tpl.html',
              controller: 'AfricanCtrl',
            },
          },
          resolve: {
            banana2: function() {
              console.log('banana2')
            }
          }
        })
    }
  ]);
