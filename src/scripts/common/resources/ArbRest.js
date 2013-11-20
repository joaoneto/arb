angular.module('arb.common.resources.ArbRest', [
  'restangular',
  'arb.constants'
]);

angular.module('arb.common.resources.ArbRest')
  .factory('ArbRest', [
    'Restangular',
    'URL_API',
    function (Restangular, URL_API) {

      var ArbRest = Restangular.withConfig(function (RestangularConfigurer) {
        RestangularConfigurer.setRequestSuffix('.json');
        RestangularConfigurer.setBaseUrl(URL_API + '/v1');
      });

      return ArbRest;

    }
  ]
);
