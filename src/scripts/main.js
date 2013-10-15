require.config({
  // Relative path (referring to the path ../index.html)
  baseUrl: './scripts',

  // Bunddle packages
  packages: [
    { name: 'controllers' },
    { name: 'directives' },
  ],

  // Component paths
  paths: {
    jquery: '../../components/jquery/jquery',
    angular: '../../components/angular/angular',
    ngBootstrap: '../../components/angular-bootstrap/ui-bootstrap-tpls.min',
    ngUiRouter: '../../components/angular-ui-router/angular-ui-router.min',
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
    ngBootstrap: {
      deps: ['angular']
    },
    ngUiRouter: {
      deps: ['angular']
    }
  }
})

// Require base files
require(['jquery', 'angular', 'app']);
