angular
  .module('arb.common.controllers.HomeCtrl', ['ui.router'])

  .controller('HomeCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'Notifications',
    function ($scope, $rootScope, $state, Page, Auth, Notifications) {
      console.log('HomeCtrl called');
      Page.set('title', 'Home');
      $scope.name = 'I am HomeCtrl';
    }
  ])

  .config(['$stateProvider', '$urlRouterProvider', 'resolverProvider', 
    function ($stateProvider, $urlRouterProvider, resolverProvider) {

      $stateProvider
        .state('home', {
          parent: 'root',
          url: '/',
          views: {
            'header': {
              templateUrl: 'templates/partials/navbar.tpl.html',
              controller: 'NavbarCtrl'
            },
            'container' : { 
              templateUrl: 'templates/partials/container.tpl.html',
              controller: 'HomeCtrl'
            },
            'footer':{
              templateUrl: 'templates/partials/footer.tpl.html'
            }
          }
        })
    // $routeProvider
    //   .when('/', {
    //     controller: 'AppCtrl',
    //     templateUrl: 'partials/default.html',
    //     resolve: resolverProvider.get(['currentUser'])
    //   })
    //   .otherwise({redirectTo: '/'});
  }])
