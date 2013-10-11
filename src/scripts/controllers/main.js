define([
  'angular',
  'directives',
  'controllers/AppCtrl',
  'controllers/UsersCtrl',
], function () {
  return angular
    .module('arb.controllers', [
      'arb.directives',
      'arb.controllers.AppCtrl',
      'arb.controllers.UsersCtrl'
    ]);
});
