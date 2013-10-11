define(['angular', 'ngBootstrap', 'controllers'], function () {
  angular
    .module('arb', ['arb.controllers', 'ui.bootstrap'])
    .constant('Config', {
      appName: 'arb',
    });

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['arb']);
  });
})
