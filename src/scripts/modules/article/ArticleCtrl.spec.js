//The tests
describe('<Unit Test>', function() {
  describe('Article:', function() {

    // var ArticleCtrl,
    //   $scope,
    //   $rootScope,
    //   $controller;

    beforeEach(module('arb'));

    // beforeEach(inject(function($injector) {

    //   // $rootScope = $injector.get('$rootScope');      
    //   // $scope = $rootScope.$new();
    //   // $controller = $injector.get('$controller');


    // }));

    describe('Method Save', function() {
      iit('test', 
        inject(function ($controller, _$httpBackend_, $rootScope, _ArbRest_, $state, conf) {
          $httpBackend = _$httpBackend_;
          var baseUrl = conf.getApiUrl();
          $httpBackend.expectPOST( baseUrl + '/article')
            .respond('[{"name":"tester"},{"name":"tester2"}]');
          ArbRest = _ArbRest_;
          $scope = $rootScope.$new();
          ArticleCtrl = $controller('ArticleCtrl', {
            $scope: $scope,
            ArbRest: ArbRest
          });

          $state.transitionTo('article.create');

          $scope.title = 'title of article';
          $scope.contents = 'contents of article';

          ArticleCtrl.create($state, $scope);
          console.log($httpBackend)

          $rootScope.$digest();
          $httpBackend.flush();
        })
      );

      it('should be able to save without problems', 
        inject(function(_$httpBackend_, $state, $controller, $rootScope) {
          var $httpBackend = _$httpBackend_;


          $scope = $rootScope.$new();

          ArticleCtrl = $controller('ArticleCtrl', {
            $scope: $scope,
          });

          $state.transitionTo('article.create');

          $scope.title = 'title of article';
          $scope.contents = 'contents of article';

          ArticleCtrl.create($state, $scope);
          console.log($httpBackend)

          $rootScope.$digest();
          $httpBackend.flush();

          //asset 
        })
      );

      it( 'should pass a dummy test ArticleCtrl', function() {
        ArticleCtrl.should.exist;
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
