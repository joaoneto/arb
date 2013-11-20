angular.module('arb.modules.article.ArticleLayout', [
  'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('articleLayout', {
          parent: 'home',
          abstract:true,
          views: {
            'container@root' : {
              templateUrl: 'scripts/modules/article/article.layout.tpl.html'
            }
          }
        })
    }
  ]);
