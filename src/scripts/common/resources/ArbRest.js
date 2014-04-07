angular.module('arb.common.resources.ArbRest', [
  'restangular',
  'arb.constants'
])

.config(['RestangularProvider', 
  function (RestangularProvider) {
    RestangularProvider.setResponseInterceptor(
      function (data, operation, what) {
        // console.log(data);
        return data;
    });  
  }
])

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
]);
