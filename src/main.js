// require(['require', 'config/require.js'], function (require) {
// 	// Require base files
//   require(['app']);
// });
requirejs.config({
  baseUrl: './scripts',
  shim: {
    jquery: {
      exports: 'jQuery'
    },
    angular: {
      exports: 'angular',
      deps: [
        'jquery'
      ]
    },
    'angular-mocks': [
      'angular'
    ],
    'angular-resource': [
      'angular'
    ],
    'angular-bootstrap': [
      'angular'
    ],
    'angular-ui-router': [
      'angular'
    ],
    'src.map': [
      'angular-mocks',
      'angular-resource',
      'angular-ui-router',
      'angular-bootstrap'
    ],
    app: [
      'src.map'
    ]
  },
  paths: {
    'angular-bootstrap': '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
    'angular-mocks': '../../bower_components/angular-mocks/angular-mocks',
    'angular-resource': '../../bower_components/angular-resource/angular-resource',
    'angular-ui-router': '../../bower_components/angular-ui-router/release/angular-ui-router.min',
    angular: '../../bower_components/angular/angular',
    bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../../bower_components/jquery/jquery',
    requirejs: '../../bower_components/requirejs/require',
    respond: '../../bower_components/respond/respond.src',
    html5shiv: '../../bower_components/html5shiv/dist/html5shiv',
    'html5shiv-printshiv': '../../bower_components/html5shiv/dist/html5shiv-printshiv'
  }
})

require(['app'])