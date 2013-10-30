require.config({
  // Relative path (referring to the path ../index.html)
  baseUrl: './scripts',

  // Bunddle packages
  packages: [
    { name: 'common' },
  ],

  // Component paths
  paths: {
    jquery: '../components/jquery/jquery',
    angular: '../components/angular/angular',
    ngMockE2E: '../components/angular-mocks/angular-mocks',
    ngResource: '../components/angular-resource/angular-resource.min',
    ngBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls.min',
    ngUiRouter: '../components/angular-ui-router/angular-ui-router.min',
  },

  // Dependencies orders
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    angular: {
      exports: 'angular',
      deps: ['jquery']
    },
    ngMockE2E: ['angular'],
    ngResource: ['angular'],
    ngBootstrap: ['angular'],
    ngUiRouter: ['angular']
  }
})