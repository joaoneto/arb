angular.module('arb.modules.article.ArticleLayout', [
  'ui.router'
  ])

  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('articleLayout', {
          parent: 'root',
          abstract:true,
          views: {
            'container' : {
              templateUrl: 'modules/article/article.layout.tpl.html'
            }
          }
        })
    }
  ]);
