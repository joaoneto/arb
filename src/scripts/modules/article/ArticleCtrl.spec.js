//The tests
describe('<Unit Test>', function() {
  describe('Article:', function() {
    var createController,
      ArticleCtrl,
      $httpBackend,
      $scope,
      $rootScope,
      $state,
      $stateParams,
      Page,
      Auth,
      Notifications,
      ArbRest,
      $controller;

    beforeEach(module('arb'));

    // Mock states
    beforeEach(module(function ($stateProvider) {
//      $stateProvider.state('login', {}).state('logout', {})
      $stateProvider
        .state('article', {})
        .state('article.create', {});
    }));

    // beforeEach(module('$stateProvider', function ($stateProvider) { 
    //   console.log('------------------------>')      
    //   var $stateProvider = $injector.get('$stateProvider');
    //   $stateProvider
    //     .state('article', {})
    //     .state('article.create', {}); 
    // }));

    beforeEach(inject(function($injector) {

      $rootScope = $injector.get('$rootScope');      
      $scope = $rootScope.$new();
      $state = $injector.get('$state');
      $stateParams = $injector.get('$stateParams');
      Page = $injector.get('Page');
      Auth = $injector.get('Auth');
      Notifications = $injector.get('Notifications');
      ArbRest = $injector.get('ArbRest');
      $controller = $injector.get('$controller');

      $httpBackend = $injector.get('$httpBackend');
      // var conf = $injector.get('conf');

      // $httpBackend.when('GET',conf.getApiUrl() + '/scripts/common/app/layouts/default.tpl.html')
      //   .respond(function (method, url, data) {
      //     console.log('get do template');
      //     return [200, ''];
      //   });

      // $state.transitionTo('article.create', {});

      createController = function() {
        $state.transitionTo('article', {});
        //$rootScope.$apply();
        return $controller('ArticleCtrl', {
          $scope: $scope,
          $rootScope: $rootScope,
          $state: $state,
          $stateParams: $stateParams,
          Page: Page,
          Auth: Auth,
          Notifications: Notifications,
          ArbRest: ArbRest
        });
        // .config(['$stateProvider', function ($stateProvider) {
        //   $stateProvider
        //     .state('article', {})
        //     .state('article.create', {});
        // }]);
      };

    }));

    describe('Method Save', function() {

      it( 'should pass a dummy test ArticleCtrl', function() {
        ArticleCtrl.should.exist;
      });

      iit('should be able to save without problems', function () {
        $scope.title = 'title of article';
        $scope.contents = 'contents of article';
        ArticleCtrl = createController();
        $state.transitionTo('article.create', {});
        ArticleCtrl.create();
        $httpBackend.flush();
      });

      it('should be able to show an error when try to save without title', function(done) {
        article.title = '';

        return article.save(function(err) {
          should.exist(err);
          done();
        });
      });
    });

    // afterEach(function(done) {
    //   Article.remove({});
    //   User.remove({});
    //   done();
    // });
    // after(function(done){
    //   Article.remove().exec();
    //   User.remove().exec();
    //   done();
    // });
  });
});
