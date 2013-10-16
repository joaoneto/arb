define(['angular'], function (angular) {
  return angular
    .module('arb.services.Page', [])

    .factory('Page', function () {
      var title = 'ARB';

      return {
        title: function () {
          return title;
        },
        setTitle: function (newTitle) {
          title = newTitle;
        }
      };
    })

});
