var dependencies = [
  'controllers',
  'directives'
];

define('app', dependencies, function () {
  console.log('Create arb module');
  return angular.module('arb', ['arb.controllers']);
});
