// don't forget to remove `lib/api-mocks` and `arb.lib.apiMocks` dependencies, to use the real api
define([
  'angular',
  'lib/conf-provider',
  'lib/api-mocks',
  'services',
  'controllers',
  'ngBootstrap'
], function () {
  angular
    .module('arb', ['arb.lib.conf', 'arb.lib.apiMocks', 'arb.services', 'arb.controllers', 'ui.bootstrap'])

    /*
    // not working to set defaults withCredentials
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.withCredentials = true;
    }])

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
