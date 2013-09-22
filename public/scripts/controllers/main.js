var dependencies = [
  'ngRequirePackage',
  'controllers/usersCtrl',
  'controllers/postsCtrl',
];

define('controllers', dependencies, function (ngRequirePackage) {
  console.log('controllers init')
  return angular.module('arb.controllers', ngRequirePackage.load(arguments));
});
