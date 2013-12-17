//The tests
describe('<Unit Test>', function() {
  describe('Article:', function() {

    var $scope, ArticleCtrl;

    beforeEach(module('arb'));

    beforeEach(inject(function ($controller, _$httpBackend_, $rootScope, $state, _ArbRest_, conf) {

      var baseUrl = conf.getApiUrl();
      $scope = $rootScope.$new();
      ArticleCtrl = $controller('ArticleCtrl', {
        $scope: $scope,
        ArbRest: _ArbRest_
      });

      _$httpBackend_.expectPOST( baseUrl + '/article').respond();
      
      $state.transitionTo('article');

    }));

    afterEach(inject(function ($rootScope, _$httpBackend_) {

      $rootScope.$digest();
      _$httpBackend_.flush();

    }));

    describe('Method Save', function() {
      iit('test', 
        inject(function ($rootScope, $state, conf) {

          $state.transitionTo('article.create');

          $scope.title = 'title of article';
          $scope.contents = 'contents of article';

          ArticleCtrl.create($state, $scope);

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
