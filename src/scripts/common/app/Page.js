angular.module('arb.common.app.Page', [])

.factory('Page', ['$rootScope', 'conf', 'Auth', function ($rootScope, conf, Auth) {
  $rootScope.page = {
    title: 'ARB',
    appName: conf.get('appName'),
    currentUser: Auth.currentUser()
  };

  $rootScope.$on('auth.currentuser', function (event, message) {
    $rootScope.page.currentUser = message;
  });

  $rootScope.$on('auth.authenticated', function (event, message) {
    $rootScope.page.currentUser = message;
  });

  return {
    get: function (key) {
      return $rootScope.page[key];
    },
    set: function (key, val) {
      $rootScope.page[key] = val;
    }
  };
}])

.run(['$rootScope', 'Page', 'Auth', function ($rootScope, Page, Auth) {
  $rootScope.Page = Page;
  $rootScope.Auth = Auth;
}])
