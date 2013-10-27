var tests = Object.keys(window.__karma__.files).filter(function (file) {
  return /\.spec\.js$/.test(file);
});

requirejs.config({
  baseUrl: '/base/src/scripts',

  // Bunddle packages
  packages: [
    { name: 'controllers' },
    { name: 'directives' },
    { name: 'services' }
  ],

  // Component paths
  paths: {
    jquery: '../components/jquery/jquery',
    angular: '../components/angular/angular',
    ngMockE2E: '../components/angular-mocks/angular-mocks',
    ngResource: '../components/angular-resource/angular-resource.min',
    ngBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls.min',
    ngUiRouter: '../components/angular-ui-router/angular-ui-router.min'
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
  },

  deps: tests,

  callback: window.__karma__.start
});
