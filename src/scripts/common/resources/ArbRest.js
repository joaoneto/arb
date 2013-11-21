angular.module('arb.common.resources.ArbRest', [
  'restangular',
  'arb.constants'
]);

angular.module('arb.common.resources.ArbRest')
  .factory('ArbRest', [
    'Restangular',
    'conf',
    function (Restangular, conf) {
      var ArbRest = Restangular.withConfig(function (RestangularConfigurer) {
        // RestangularConfigurer.setRequestSuffix('.json');
        RestangularConfigurer.setBaseUrl(conf.getApiUrl());
      });

      return ArbRest;

    }
  ]
);
