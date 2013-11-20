angular.module('arb', [
  'arb.common',
  'arb.modules'
])

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
