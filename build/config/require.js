require.config({
  baseUrl: './scripts',
  packages: [
    {
      name: 'common'
    }
  ],
  paths: {
    jquery: 'components/jquery/jquery',
    angular: 'components/angular/angular',
    ngMockE2E: '../components/angular-mocks/angular-mocks',
    ngResource: '../components/angular-resource/angular-resource.min',
    ngBootstrap: '../components/angular-bootstrap/ui-bootstrap-tpls.min',
    ngUiRouter: '../components/angular-ui-router/angular-ui-router.min',
    'angular-bootstrap': 'components/angular-bootstrap/ui-bootstrap-tpls',
    'angular-mocks': 'components/angular-mocks/angular-mocks',
    'angular-resource': 'components/angular-resource/angular-resource',
    'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router.min',
    bootstrap: 'components/bootstrap/dist/js/bootstrap',
    requirejs: 'components/requirejs/require',
    respond: 'components/respond/respond.src',
    html5shiv: 'components/html5shiv/dist/html5shiv',
    'html5shiv-printshiv': 'components/html5shiv/dist/html5shiv-printshiv'
  },
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
    ngMockE2E: [
      'angular'
    ],
    ngResource: [
      'angular'
    ],
    ngBootstrap: [
      'angular'
    ],
    ngUiRouter: [
      'angular'
    ]
  }
})