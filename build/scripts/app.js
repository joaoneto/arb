// don't forget to remove `lib/api-mocks` and `arb.lib.apiMocks` dependencies, to use the real api
define([
  'angular',
  'common/conf-provider',
  'common/resolver-provider',
  'common/api-mocks',
  'services',
  'controllers',
  'ngBootstrap'
], function () {
  angular
    .module('arb', ['arb.lib.conf', 'arb.lib.resolver', 'arb.lib.apiMocks', 'arb.services', 'arb.controllers', 'ui.bootstrap'])

    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      $httpProvider.defaults.withCredentials = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    /*
    // Uncomment this block, to configure your own
    .config(['confProvider', function (confProvider) {
      confProvider.set('appName', 'My app name');
      confProvider.set('baseUrl', 'http://localhost:3000');
    }]);
    */

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['arb']);
  });
});
