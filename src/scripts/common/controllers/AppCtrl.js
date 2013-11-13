angular
  .module('arb.common.controllers.AppCtrl', ['ui.router'])

  .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'Notifications',
    function ($scope, $rootScope, $state, Page, Auth, Notifications) {
      console.log('AppCtrl called');
      Page.set('title', 'Home');
      $scope.name = 'I am AppCtrl';
      //$state.go('root.home')

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
    resolverProvider
      .add({
        currentUser: ['Auth', function (Auth) {
          return Auth.currentUser();
        }]
      })

    //$urlRouterProvider.otherwise('/');

    $stateProvider
      .state('root', {
        abstract: true,
        templateUrl: 'templates/layouts/home.tpl.html',
        // controller: 'AppCtrl',
        // resolve: resolverProvider.get(['currentUser'])
      }
    )
  }])
