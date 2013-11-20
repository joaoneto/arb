angular.module('arb.common.app.HomeCtrl', [])

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
            templateUrl: 'scripts/common/app/navbar.tpl.html',
            controller: 'NavbarCtrl'
          },
          'container' : {
            templateUrl: 'scripts/common/app/container.tpl.html',
            controller: 'HomeCtrl'
          },
          'footer': {
            templateUrl: 'scripts/common/app/footer.tpl.html'
          }
        }
      })
  }
]);


