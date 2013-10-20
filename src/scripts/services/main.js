define([
  'angular',
  'ngResource',
  'services/Auth',
  'services/Page',
  'services/Notifications'
], function () {
  return angular
    .module('arb.services', [
      'ngResource',
      'arb.services.Auth',
      'arb.services.Page',
      'arb.services.Notifications'
    ]);
});
