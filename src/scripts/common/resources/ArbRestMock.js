angular.module('arb.common.resources.ArbRestMock', ['ngMockE2E'])

.run(['$httpBackend', '$timeout', '$log', 'conf', 'sessionStorage',
  function ($httpBackend, $timeout, $log, conf, sessionStorage) {
    var baseUrl = conf.getApiUrl();
    var authorized = sessionStorage.get('authenticated');
    var userData = { id: '1234567890', username: 'user', role: ['moderator'] };

    function getIdFromResource(resource, url) {
      return url.split('/').pop().replace(resource, '');
    }

    /**
     * Session API
     */

    $httpBackend.when('GET', baseUrl + '/session')
      .respond(function (method, url, data) {
        $log.info(method, baseUrl + '/session');

        if (authorized) {
          return [200, userData];
        } else {
          return [406, { error: 'You are not logged in.' }];
        }
      });

    $httpBackend.when('POST', baseUrl + '/session')
      .respond(function (method, url, data) {
        $log.info(method, baseUrl + '/session');

        if (authorized) {
          return [401, { error: 'You are already logged in.' }];
        } else {
          authorized = true;
          return [200, userData];
        }
      });

    $httpBackend.when('DELETE', baseUrl + '/session')
      .respond(function (method, url, data) {
        authorized = false;
        $log.info(method, baseUrl + '/session');

        return [200];
      });

    /**
     * Article API
     */

    // /article
    // /article/
    // /article/[a-z0-9]
    $httpBackend.when('GET', new RegExp(baseUrl + '/article(\/\w+)?'))
      .respond(function (method, url, data, headers) {
        var id = getIdFromResource('article', url);
        var articles = JSON.parse(sessionStorage.get('articles')) || [];
        var result = id ? articles[id-1] : articles;

        $log.info(method, baseUrl + '/article');

        if (!authorized) {
          return [401, { error: 'You are not logged in.' }];
        } else {
          return [200, result];
        }
      });

    $httpBackend.when('POST', baseUrl + '/article')
      .respond(function (method, url, data) {
        var articles = JSON.parse(sessionStorage.get('articles')) || [];
        var parsedData = JSON.parse(data);

        var newArticle = {
          _id: articles.length + 1,
          title: parsedData.title,
          content: parsedData.content,
          created: new Date()
        };

        $log.info(method, baseUrl + '/article');

        if (!authorized) {
          return [401, { error: 'You are not logged in.' }];
        } else {
          articles.push(newArticle);
          sessionStorage.set('articles', JSON.stringify(articles));
          return [200, newArticle];
        }
      });

    // $httpBackend.whenPOST(baseUrl + 'data/protected').respond(function (method, url, data) {
    //   return authorized ? [200, 'This is confidential [' + data + '].'] : [401];
    // });

    // otherwise
    $httpBackend.when('GET', /.*/).passThrough();
    $httpBackend.when('POST', /.*/).passThrough();
  }
]);
