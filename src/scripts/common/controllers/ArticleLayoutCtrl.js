angular.module('arb.common.controllers.ArticleLayoutCtrl', [
  'arb.common.controllers.HomeCtrl'
  ])

  .controller('ArticleLayoutCtrl', ['$scope', '$rootScope', '$state', 'Page',
    function ($scope, $rootScope, $state, Page) {
      console.log('ArticleLayoutCtrl called');
      Page.set('title', 'Home');
      $scope.name = 'I am ArticleLayoutCtrl';
      //$state.go('root.home')

      // setInterval(function () {
      //   Page.set('title', new Date().getTime())
      //   Notifications.remove('bla', 0);
      //   Notifications.add('bla', { test: new Date().getTime() });
      //   $scope.$apply()
      // }, 1000);
    }]
  )

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('root.african.home.articleLayout', {
          abstract:true,
          views: {
            'container@african' : {
              templateUrl: 'templates/layouts/article.tpl.html',
              controller: 'ArticleLayoutCtrl'
            }
          }
        })
    }
  ]);
