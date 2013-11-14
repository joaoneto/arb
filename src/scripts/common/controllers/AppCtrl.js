angular
  .module('arb.common.controllers.AppCtrl', [
    'ui.bootstrap',
    'ui.router'
  ])

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
    }]
  )

  .config(['$stateProvider', '$urlRouterProvider', 'resolverProvider',
    function ($stateProvider, $urlRouterProvider, resolverProvider) {
      resolverProvider
        .add({
          currentUser: ['Auth', function (Auth) {
            return Auth.currentUser();
          }]
        })

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('root', {
        //abstract: true,
        resolve: {
          banana: function() {
            console.log('banana')
          }
        }
        //resolve: resolverProvider.get(['currentUser'])
      })

    }]
  )
  .run(['$rootScope', '$state', '$stateParams',
    function ($rootScope,   $state,   $stateParams) {

      // It's very handy to add references to $state and $stateParams to the $rootScope
      // so that you can access them from any scope within your applications.For example,
      // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
      // to active whenever 'contacts.list' or one of its decendents is active.
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on('$stateChangeSuccess', function() {
        console.log('$stateChangeSuccess', arguments);
      })
      $rootScope.$on('$stateChangeStart', function() {
        console.log('$stateChangeStart', arguments);
      })
      $rootScope.$on('$stateNotFound', function() {
        console.log('$stateNotFound', arguments);
      })
      $rootScope.$on('$stateChangeError', function() {
        console.log('$stateChangeError', arguments);
      })

      $rootScope.$on('$viewContentLoading', function(event, viewConfig) {
        console.log('$viewContentLoading', event, viewConfig);
      })
      $rootScope.$on('$viewContentLoaded', function(event, viewConfig) {
        console.log('$viewContentLoaded', event.currentScope.$state.$current.navigable.views);
        console.log('$viewContentLoaded', event.targetScope.$state.$current.navigable.views);
      })

    }
  ]);
