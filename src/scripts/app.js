angular.module('arb', [
  'arb.constants',
  'arb.common',
  'arb.modules',
  'arb.templates.cache'
])

.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}])

.config(['confProvider', 'API_URL', 'API_PORT', 'API_VERSION',
  function (confProvider, API_URL, API_PORT, API_VERSION) {
    confProvider.set('appName', 'ARB');
    confProvider.set('baseUrl', API_URL);
    confProvider.set('port', API_PORT);
    confProvider.set('version', API_VERSION);
  }]
);

// angular.element(document).ready(function () {
//   angular.bootstrap(document, ['arb']);
// });
