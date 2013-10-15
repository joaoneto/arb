// don't forget to remove `lib/api-mocks` and `arb.lib.apiMocks` dependencies, to use the real api
define([
  'angular',
  'lib/conf-provider',
  'lib/api-mocks',
  'controllers',
  'ngBootstrap'
], function () {
  angular
    .module('arb', ['arb.lib.conf', 'arb.lib.apiMocks', 'arb.controllers', 'ui.bootstrap'])
    .config(['confProvider', function (confProvider) {
      confProvider.set('appName', 'My app name');
    }]);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['arb']);
  });
});
