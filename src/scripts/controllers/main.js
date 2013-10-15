define([
  'angular',
  'directives',
  'ngUiRouter',
  'controllers/AppCtrl',
  'controllers/NavbarCtrl',
], function () {
  return angular
    .module('arb.controllers', [
      'ui.router',
      'arb.directives',
      'arb.controllers.AppCtrl',
      'arb.controllers.NavbarCtrl'
    ]);
});
