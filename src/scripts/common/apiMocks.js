angular.module('arb.common.apiMocks', ['ngMockE2E'])

.run(['$httpBackend', '$timeout', '$log', 'conf', 'sessionStorage',
  function ($httpBackend, $timeout, $log, conf, sessionStorage) {
    var baseUrl = conf.getApiUrl();
    var authorized = sessionStorage.get('authenticated');
    var userData = { id: '1234567890', username: 'user', role: ['moderator'] };

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

    $httpBackend.when('GET', baseUrl + '/article')
      .respond(function (method, url, data) {
        var articles = JSON.parse(sessionStorage.get('articles')) || [];
        $log.info(method, baseUrl + '/article');

        // if (!authorized) {
        //   return [401, { error: 'You are not logged in.' }];
        // } else {
        return [200, articles];
      });

    $httpBackend.when('POST', baseUrl + '/article')
      .respond(function (method, url, data) {
        data = JSON.parse(data);
        var articles = JSON.parse(sessionStorage.get('articles')) || [];
        $log.info(method, baseUrl + '/article');
        console.log(arguments);

        // if (!authorized) {
        //   return [401, { error: 'You are not logged in.' }];
        // } else {
          var data2 = {
            _id: articles.length + 1,
            title: data.title,
            content: data.content,
            created: new Date()
          };

          articles.push(data2);

          sessionStorage.set('articles', JSON.stringify(articles));
          return [200, data2];
      });

    // $httpBackend.whenPOST(baseUrl + 'data/protected').respond(function (method, url, data) {
    //   return authorized ? [200, 'This is confidential [' + data + '].'] : [401];
    // });

    // otherwise
    $httpBackend.when('GET', /.*/).passThrough();
  }
]);
