define(['angular', 'controllers'], function () {
  angular.module('arb', ['arb.controllers']);

  angular.element(document).ready(function () {
    angular.bootstrap(document, ['arb']);
  });
})
