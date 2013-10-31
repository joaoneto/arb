require.config({
  baseUrl: './scripts',
  packages: [
    {
      name: 'common'
    }
  ],
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
    'amd.map': [
      'angular-mocks',
      'angular-resource'
    ],
    app: [
      'amd.map',
      'angular-ui-router',
      'angular-bootstrap'
    ]
  },
  paths: {
    'angular-bootstrap': '../components/angular-bootstrap/ui-bootstrap-tpls',
    'angular-mocks': '../components/angular-mocks/angular-mocks',
    'angular-resource': '../components/angular-resource/angular-resource',
    'angular-ui-router': '../components/angular-ui-router/release/angular-ui-router.min',
    angular: '../components/angular/angular',
    bootstrap: '../components/bootstrap/dist/js/bootstrap',
    jquery: '../components/jquery/jquery',
    requirejs: '../components/requirejs/require',
    respond: '../components/respond/respond.src',
    html5shiv: '../components/html5shiv/dist/html5shiv',
    'html5shiv-printshiv': '../components/html5shiv/dist/html5shiv-printshiv'
  }
})
