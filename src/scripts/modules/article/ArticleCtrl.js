angular.module('arb.modules.article.ArticleCtrl', [
  'arb.modules.article.ArticleLayout'
])

.controller('ArticleCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'Notifications',
  function ($scope, $rootScope, $state, Page, Auth, Notifications) {
    console.log('ArticleCtrl called');
    Page.set('title', 'Article');
    $scope.name = 'I am ArticleCtrl';
  }
])

.config(['$stateProvider', '$urlRouterProvider', 'resolverProvider',
  function ($stateProvider, $urlRouterProvider, resolverProvider) {

    $stateProvider
      .state('article', {
        parent: 'articleLayout',
        url: 'article',
        views: {
          'center' : {
            templateUrl: 'scripts/modules/article/article.tpl.html',
            controller: 'ArticleCtrl as article'
          }
        }
      })
  }
]);


// angular.module('arb.modules.article.ArticleCtrl', [])
//   .controller('ArticleCtrl',
//     ['$scope', '$routeParams', '$location', 'Global', 'Articles',
//     function ($scope, $routeParams, $location, Global, Articles) {
//       $scope.global = Global;

//       $scope.create = function() {
//         var article = new Articles({
//           title: this.title,
//           content: this.content
//         });
//         article.$save(function(response) {
//           $location.path("articles/" + response._id);
//         });

//         this.title = "";
//         this.content = "";
//       };

//       $scope.remove = function(article) {
//         article.$remove();

//         for (var i in $scope.articles) {
//           if ($scope.articles[i] == article) {
//             $scope.articles.splice(i, 1);
//           }
//         }
//       };

//       $scope.update = function() {
//         var article = $scope.article;
//         if (!article.updated) {
//           article.updated = [];
//         }
//         article.updated.push(new Date().getTime());

//         article.$update(function() {
//           $location.path('articles/' + article._id);
//         });
//       };

//       $scope.find = function() {
//         Articles.query(function(articles) {
//           $scope.articles = articles;
//         });
//       };

//       $scope.findOne = function() {
//         Articles.get({
//           articleId: $routeParams.articleId
//         }, function(article) {
//           $scope.article = article;
//         });
//       };
//     }])
