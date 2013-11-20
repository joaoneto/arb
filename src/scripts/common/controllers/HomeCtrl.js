angular
  .module('arb.common.controllers.HomeCtrl', [
  ])

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
            'footer': {
              templateUrl: 'templates/partials/footer.tpl.html'
            }
          },
          resolve: {
            banana3: ['$state', function($state) {
              console.log($state)
            }]
          }
        })
    }
  ]);


