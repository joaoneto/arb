require.config({
  // Relative path (referring to the path ../index.html)
  baseUrl: './scripts',

  // Dependencies orders
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    angular: {
      exports: 'angular',
      deps: ['jquery']
    },
    'angular-mocks': ['angular'],
    'angular-resource': ['angular'],
    'angular-bootstrap': ['angular'],
    'angular-ui-router': ['angular'],
    'src.map': ['angular-mocks', 'angular-resource'],
    app: ['src.map', 'angular-ui-router', 'angular-bootstrap'],
  }
})
