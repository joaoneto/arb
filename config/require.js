requirejs.config({
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
    'src.map': [
      'angular-mocks',
      'angular-resource',
      'angular-ui-router',
      'angular-bootstrap',
    ],    
    app: [
      'src.map'
    ]
  },
  map: {
    '*': {
      'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router'
    },
  },

  paths: {
    'src.map': '../config/src.map'
  }
})
