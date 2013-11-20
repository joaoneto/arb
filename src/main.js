require.config({baseUrl : './scripts'});
require(['require', 'config/require.js'], function (require) {
	// Require base files
	require(['app', 'angular'], function (app, angular) {

      angular.element(document).ready(function () {
        angular.bootstrap(document, ['arb']);
      });

    });
});
