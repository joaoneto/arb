angular.module('arb.modules.article.ArticleCtrl', [
  'arb.modules.article.ArticleLayout'
])

.controller('ArticleCtrl', ['$scope', '$rootScope', '$state', 'Page', 'Auth', 'Notifications', 'ArbRest',
  function ($scope, $rootScope, $state, Page, Auth, Notifications, ArbRest) {
    console.log('ArticleCtrl called');

    var Articles = ArbRest.all('article');
    Page.set('title', 'Article');

    this.create = function () {
      var article = Articles.post({
        title: $scope.title,
        content: $scope.content
      });

      article.then(function (user) {
        console.log(user)
        // $state.go('articles/' + user._id);
      }, function (err) {
        console.log('Crap, error creating article!', err);
      });

      // $scope.title = '';
      // $scope.content = '';
    };

    this.remove = function (article) {
      article.$remove();

      for (var i in $scope.articles) {
        if ($scope.articles[i] == article) {
          $scope.articles.splice(i, 1);
        }
      }
    };

    this.update = function () {
      var article = $scope.article;
      if (!article.updated) {
        article.updated = [];
      }
      article.updated.push(new Date().getTime());

      article.$update(function () {
        $state.go('articles/' + article._id);
      });
    };

    this.find = function () {
      Articles.query(function(articles) {
        $scope.articles = articles;
      });
    };

    this.findOne = function () {
      Articles.get({
        articleId: $routeParams.articleId
      }, function(article) {
        $scope.article = article;
      });
    };
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
