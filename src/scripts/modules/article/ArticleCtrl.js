angular.module('arb.modules.article.ArticleCtrl', [
  'arb.modules.article.ArticleLayout'
])

.controller('ArticleCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'Page', 'Auth', 'Notifications', 'ArbRest',
  function ($scope, $rootScope, $state, $stateParams, Page, Auth, Notifications, ArbRest) {
    console.log('ArticleCtrl called');

    var Articles = ArbRest.all('article');
    Page.set('title', 'Article');

    this.create = function () {
      var article = Articles.post({
        title: $scope.title,
        content: $scope.content
      });

      article.then(function (article) {
        console.log('article ok ', article)
        $state.go('article');
      }, function (err) {
        console.log('fuck', err.status)
        console.log('Crap, error creating article!', err);
      });
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
      Articles.getList()
        .then(function (articles) {
          $scope.articles = articles;
        });
    };

    this.findOne = function () {
      Articles.get($stateParams._id)
        .then( function (article) {
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
            templateUrl: 'scripts/modules/article/list.tpl.html',
            controller: 'ArticleCtrl as article'
          }
        }
      })
      .state('article.create', {
        parent: 'articleLayout',
        url: 'article',
        views: {
          'center' : {
            templateUrl: 'scripts/modules/article/create.tpl.html',
            controller: 'ArticleCtrl as article'
          }
        }
      })

      .state('article.detail', {
        parent: 'articleLayout',
        url: 'article/{_id:[0-9]{1,16}}',
        views: {
          'center' : {
            templateUrl: 'scripts/modules/article/edit.tpl.html',
            controller: 'ArticleCtrl as article'
          }
        }
      })
    }
]);

