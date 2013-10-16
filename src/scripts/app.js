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
    // Uncomment this block, to configure your own
    .config(['confProvider', function (confProvider) {
      confProvider.set('appName', 'My app name');
      confProvider.set('baseUrl', 'http://api.myserver.com/');
      confProvider.set('apiVersion', 'v1');
    }]);
    */

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['arb']);
  });
});
