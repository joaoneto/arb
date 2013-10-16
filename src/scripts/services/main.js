define([
  'angular',
  'ngResource',
  'services/Auth',
  'services/Page'
], function () {
  return angular
    .module('arb.services', [
      'ngResource',
      'arb.services.Auth',
      'arb.services.Page'
    ]);
});
