define(['angular', 'ngMockE2E'], function () {
  return angular.module('arb.lib.apiMocks', ['ngMockE2E'])
    .run(['$httpBackend', function ($httpBackend) {
      var authorized = false;

      $httpBackend.whenPOST('auth/login').respond(function (method, url, data) {
        authorized = true;
        return [200];
      });

      $httpBackend.whenPOST('auth/logout').respond(function (method, url, data) {
        authorized = false;
        return [200];
      });

      $httpBackend.whenPOST('data/protected').respond(function (method, url, data) {
        return authorized ? [200, 'This is confidential [' + data + '].'] : [401];
      });

      //otherwise
      $httpBackend.whenGET(/.*/).passThrough();
    }]);
});
