require.config({
  packages: [
    { name: 'controllers' },
    { name: 'directives' },
  ],
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

