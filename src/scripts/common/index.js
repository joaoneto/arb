angular
  .module('arb.common', [
    'arb.common.apiMocks',
    'arb.common.resolverProvider', 
    'arb.common.confProvider', 
    'arb.common.sessionStorage',
    
    'arb.common.controllers',
    'arb.common.services',
    'arb.common.security',

  ]);
