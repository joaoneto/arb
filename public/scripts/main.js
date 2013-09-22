require.config({
  packages: [
    { name: 'controllers' },
    { name: 'directives' },
  ],
  shim: {
    angular: {
      deps: ['jquery']
    }
  },
  paths: {
    jquery: '../assets/jquery/jquery.min',
    angular: '../assets/angular/angular.min',
  }
});

require(['jquery', 'angular', 'app'], function () {
  angular.element(document).ready(function () {
    angular.bootstrap(document, ['arb']);
  });
});

