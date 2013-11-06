var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

//console.log(window.__karma__.files)

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

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
        'angular-resource'
      ],
      app: [
        'src.map',
        'angular-ui-router',
        'angular-bootstrap'
      ]
    },
    paths: {
      'angular-mocks': 'components/angular-mocks/angular-mocks',
      'angular-bootstrap': 'components/angular-bootstrap/ui-bootstrap-tpls',
      'angular-resource': 'components/angular-resource/angular-resource',
      angular: 'components/angular/angular',
      'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router.min',
      bootstrap: 'components/bootstrap/dist/js/bootstrap',
      jquery: 'components/jquery/jquery',
      requirejs: 'components/requirejs/require',
      respond: 'components/respond/respond.src',
      html5shiv: 'components/html5shiv/dist/html5shiv',
      'html5shiv-printshiv': 'components/html5shiv/dist/html5shiv-printshiv'
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});

//require(['require', '/base/build/config/require.js'], function (require) {
  // Require base files
  require(['app']);
//});
