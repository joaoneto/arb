define([
  'angular',
  'directives',
  'controllers/AppCtrl',
  'controllers/NavbarCtrl',
], function () {
  return angular
    .module('arb.controllers', [
      'arb.directives',
      'arb.controllers.AppCtrl',
      'arb.controllers.NavbarCtrl'
    ]);
});
