define(['angular', 'lib/conf-provider', 'lib/session-storage', 'ngMockE2E'], function () {
  return angular.module('arb.lib.apiMocks', ['arb.lib.conf', 'arb.lib.sessionStorage', 'ngMockE2E'])
    .run(['$httpBackend', '$log', '$timeout', 'conf', 'sessionStorage', function ($httpBackend, $log, $timeout, conf, sessionStorage) {
      var baseUrl = conf.get('baseUrl');
      var authorized = sessionStorage.get('authenticated');
      var userData = { id: '1234567890', username: 'user' };


      $httpBackend.when('GET', baseUrl + '/session').respond(function (method, url, data) {
        $log.info(method, baseUrl + '/session');

        if (authorized) {
          return [200, userData];
        } else {
          return [401, { error: 'You are not logged in.' }];
        }
      });

      $httpBackend.when('POST', baseUrl + '/session').respond(function (method, url, data) {
        $log.info(method, baseUrl + '/session');

        if (authorized) {
          return [401, { error: 'You are already logged in.' }];
        } else {
          authorized = true;
          return [200, userData];
        }
      });

      $httpBackend.when('DELETE', baseUrl + '/session').respond(function (method, url, data) {
        authorized = false;
        $log.info(method, baseUrl + '/session');

        return [200];
      });

      // $httpBackend.whenPOST(baseUrl + 'data/protected').respond(function (method, url, data) {
      //   return authorized ? [200, 'This is confidential [' + data + '].'] : [401];
      // });

      // otherwise
      $httpBackend.when('GET', /.*/).passThrough();
    }]);
});
