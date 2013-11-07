/**
 * another one monkey patch to prevent "no timestamp" error
 * https://github.com/karma-runner/karma-requirejs/issues/6#issuecomment-23037725
 */
(function (global) {
  var fileWithoutLeadingSlash;
  // array where all spec files will be included
  global.tests = [];

  for (var file in global.__karma__.files) {
    if (global.__karma__.files.hasOwnProperty(file)) {
      // get rid of leading slash in file path - prevents "no timestamp" error
      fileWithoutLeadingSlash = file.replace(/^\//, '');
      global.__karma__.files[fileWithoutLeadingSlash] = global.__karma__.files[file];
      delete global.__karma__.files[file];

      // we get all the test files automatically and store to window.tests array
      if (/spec\.js$/.test(fileWithoutLeadingSlash)) {
        global.tests.push(fileWithoutLeadingSlash);
      }
    }
  }
})(this);


require.config({
    // Karma serves files from '/base'
  baseUrl: '/base/src/scripts',
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
      'angular',
      'angular-mocks',
      'angular-resource',
      'angular-ui-router',
      'angular-bootstrap',
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
  },
    // ask Require.js to load these files (all our tests)
    deps: tests,

    // // start test run, once Require.js is done
    // callback: function() {
    //   console.log('*****************************',arguments)
    //   require(['app']);
    //   process.exit();
    //   window.__karma__.start
    // }
});

require(['app'], function () {
  window.__karma__.start();
});