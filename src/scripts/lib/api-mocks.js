define(['angular', 'lib/conf-provider', 'ngMockE2E'], function () {
  return angular.module('arb.lib.apiMocks', ['arb.lib.conf', 'ngMockE2E'])
    .run(['$httpBackend', 'conf', function ($httpBackend, conf) {
      var baseUrl = conf.get('baseUrl');
      var authorized = false;

      $httpBackend.when('GET', baseUrl + 'v1/sessions').respond(function (method, url, data) {
        authorized = true;
        if (authorized) {
          return [200, [{ id: '1234567890', username: 'Test User' }]];
        }
      });

      $httpBackend.when('POST', baseUrl + 'v1/sessions').respond(function (method, url, data) {
        authorized = true;
        return [200];
      });

      $httpBackend.when('DELETE', baseUrl + 'v1/sessions').respond(function (method, url, data) {
        authorized = false;
        return [200];
      });

      // $httpBackend.whenPOST(baseUrl + 'data/protected').respond(function (method, url, data) {
      //   return authorized ? [200, 'This is confidential [' + data + '].'] : [401];
      // });

      // otherwise
      $httpBackend.whenGET(/.*/).passThrough();
    }]);
});
