angular
  .module('arb.common', [
    'arb.common.apiMocks',
    'arb.common.resolverProvider', 
    'arb.common.confProvider', 
    'arb.common.sessionStorage',
    
    'arb.common.services',
    'arb.common.security'
  ]);
