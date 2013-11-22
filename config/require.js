requirejs.config({
  // Dependencies orders
  shim: {
    lodash: {
      exports: '_'
    },
    jquery: {
      exports: 'jQuery'
    },
    angular: {
      exports: 'angular',
      deps: ['jquery']
    },
    'angular-mocks': ['angular'],
    'angular-bootstrap': ['angular'],
    'angular-ui-router': ['angular'],
    'restangular': ['angular', 'lodash'],
    'src.map': [
      'angular-mocks',
      'angular-ui-router',
      'angular-bootstrap',
      'restangular'
    ],    
    'constants': [
      'angular'
    ],
    app: [
      'constants',
      'src.map'
    ]
  },

  paths: {
    'src.map': '../config/src.map',
    'constants': '../config/constants',
    'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router'
  },
  
})
