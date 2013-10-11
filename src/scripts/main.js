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
  }
})

// Require base files
require(['jquery', 'angular', 'app']);
